import {
    Model,
    AutoIncrement,
    Column,
    NotEmpty,
    PrimaryKey,
    Table,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { Document, DocumentModel } from './document.model';

export enum ClientStatus {
    client = 'client',
    demo = 'demo',
    lead = 'lead',
}

export interface SearchClientParams {
    search?: string;
    birthDate?: string;
    status?: ClientStatus;
}

export class Client {
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

export interface CreateClient extends Omit<Client, 'id' | 'documents'> {}

@Table({
    tableName: 'clients',
    initialAutoIncrement: '100000',
})
export class ClientModel extends Model<Client, CreateClient> implements Client {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @NotEmpty
    @Column
    BirthDate: string;

    @NotEmpty
    @Column
    email: string;

    @NotEmpty
    @Column
    firstName: string;

    @NotEmpty
    @Column
    ipAddress: string;

    @NotEmpty
    @Column
    lastName: string;

    @NotEmpty
    @Column
    registrationDate: string;

    @Column({ type: DataType.ENUM({ values: Object.keys(ClientStatus) }) })
    status: ClientStatus;

    // @ts-ignore
    @HasMany(() => DocumentModel)
    documents: Document[];
}
