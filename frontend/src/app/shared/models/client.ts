import { Document } from '@models/./document';

export enum ClientStatus {
    all = 'all',
    client = 'client',
    demo = 'demo',
    lead = 'lead',
}

export interface SearchClientParams {
    search?: string;
    birthDate?: string;
    status?: ClientStatus;
}

export interface Client {
    id: number;

    firstName: string;

    lastName: string;

    email: string;

    BirthDate: string;

    registrationDate: string;

    ipAddress: string;

    status: ClientStatus;

    documents?: Document[];
}
