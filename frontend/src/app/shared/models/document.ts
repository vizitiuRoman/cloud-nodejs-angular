import { Client } from '@models/client';

export interface Document {
    id: number;
    name: string;
    path: string;
    size: number;
    type: string;
    userId: number;
    extension: string;
    thumbnailPath?: string;
    mimeType?: string;
    client: Client;
}
