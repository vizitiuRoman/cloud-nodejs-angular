import { Response } from 'express';
import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseBefore,
} from 'routing-controllers';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

import * as multer from 'multer';

import { CONFIG } from '../../shared/utils/config';
import { storage } from '../../shared/utils/storage';
import { getFileExtension, getFileName } from '../../shared/utils/utils';

import { CreateDocument } from '../db/models/document.model';
import { ClientAclMiddleware } from '../middlewares/client-acl.middleware';
import { DocumentService } from '../services/document.service';

@Service()
@Controller('/api/documents')
export class DocumentController {
    constructor(private documentService: DocumentService) {}

    @Get('/storage-usage/:clientId/:status')
    @UseBefore(ClientAclMiddleware)
    async getUserStorage(
        @Param('clientId') clientId: number,
        @Res() res: Response
    ): Promise<Response> {
        try {
            const userStorage = await this.documentService.getUserStorage(
                clientId
            );
            return res.status(StatusCodes.OK).send({
                size: userStorage,
            });
        } catch (e) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: e.message,
            });
        }
    }

    @Get('/download/:id/:status')
    @UseBefore(ClientAclMiddleware)
    public async downloadDocument(
        @Param('id') id: number,
        @Res() res: Response
    ): Promise<void | Response> {
        try {
            const document = await this.documentService.findDocumentByID(id);
            if (!document) {
                return res.status(StatusCodes.NOT_FOUND).send({
                    error: `Not found document by id ${id}`,
                });
            }
            const downloadPath = `${CONFIG.STORAGE_DOCUMENTS}${document.path}`;

            await new Promise<void>((resolve, reject) => {
                res.download(downloadPath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });

            return res.status(StatusCodes.OK);
        } catch (e) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: e.message,
            });
        }
    }

    @Post('/upload-docs/:clientId/:status')
    @UseBefore(ClientAclMiddleware)
    async uploadDocuments(
        @Param('clientId') clientId: number,
        @UploadedFiles('files', {
            options: multer({
                storage,
                limits: {
                    files: 10,
                    fileSize: CONFIG.MAX_FILE_SIZE,
                },
                fileFilter(
                    _,
                    file: Express.Multer.File,
                    callback: multer.FileFilterCallback
                ): void {
                    if (CONFIG.MIME_TYPES.includes(file.mimetype)) {
                        callback(null, true);
                        return;
                    }
                    callback(null, false);
                },
            }),
        })
        files: Express.Multer.File[],
        @Res() res: Response
    ): Promise<Response> {
        try {
            if (!files?.length) {
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .send({ error: 'Files is Required' });
            }
            const documentsToCreate: CreateDocument[] = [];
            for (const file of files) {
                documentsToCreate.push({
                    extension: getFileExtension(file.originalname),
                    name: getFileName(file.originalname),
                    mimeType: file.mimetype || '',
                    type: file.mimetype,
                    size: file.size,
                    path: `/${clientId}/${file.filename}`,
                    clientId,
                });
            }
            const createdDocuments = await this.documentService.createDocuments(
                documentsToCreate
            );
            return res.status(StatusCodes.CREATED).send(createdDocuments);
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: e.message,
            });
        }
    }
}
