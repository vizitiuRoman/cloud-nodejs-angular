import { Service } from 'typedi';

import {
    CreateDocument,
    Document,
    DocumentModel,
} from '../db/models/document.model';

@Service()
export class DocumentService {
    public findAllDocuments(): Promise<Document[]> {
        return DocumentModel.findAll();
    }

    public findDocumentByID(id: number): Promise<Document | null> {
        return DocumentModel.findByPk(id);
    }

    public createDocument(document: CreateDocument): Promise<Document> {
        return DocumentModel.create(document);
    }

    public createDocuments(documents: CreateDocument[]): Promise<Document[]> {
        return DocumentModel.bulkCreate(documents);
    }

    public deleteDocumentByIDS(ids: number[]): Promise<number> {
        return DocumentModel.destroy({
            where: { id: ids },
        });
    }

    public getUserStorage(clientId: number): Promise<number> {
        return DocumentModel.sum('size', { where: { clientId } });
    }
}
