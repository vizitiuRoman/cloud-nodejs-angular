import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';
import * as fs from 'fs';

import { CONFIG } from './config';

ensureDir(CONFIG.STORAGE_DOCUMENTS);

export const storage = multer.diskStorage({
    destination(
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ): void {
        ensureDir(`${CONFIG.STORAGE_DOCUMENTS}/${req.params.clientId}`);
        cb(null, `${CONFIG.STORAGE_DOCUMENTS}/${req.params.clientId}`);
    },

    filename(
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ): void {
        const fileName = file.originalname.replace(/\s/g, '');
        const filePath = `${uuidv4()}-${fileName}`;
        cb(null, filePath);
    },
});

function ensureDir(directory: string): void {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}
