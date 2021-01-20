import {
    Model,
    AutoIncrement,
    Column,
    NotEmpty,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import { Client, ClientModel } from './client.model';

export class Document {
    id: number;

    name: string;

    path: string;

    size: number;

    type: string;

    clientId: number;

    extension: string;

    thumbnailPath?: string;

    mimeType?: string;

    client: Client;
}

export interface CreateDocument extends Omit<Document, 'id' | 'client'> {}

@Table({
    tableName: 'documents',
})
export class DocumentModel
    extends Model<Document, CreateDocument>
    implements Document {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @NotEmpty
    @Column
    name!: string;

    @NotEmpty
    @Column
    path!: string;

    @NotEmpty
    @Column
    size!: number;

    @NotEmpty
    @Column
    type!: string;

    // @ts-ignore
    @ForeignKey(() => ClientModel)
    @Column
    clientId!: number;

    @NotEmpty
    @Column
    extension!: string;

    @Column
    mimeType!: string;

    @Column
    thumbnailPath!: string;

    // @ts-ignore
    @BelongsTo(() => ClientModel)
    client: Client;
}
