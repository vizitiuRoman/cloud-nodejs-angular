import { col, fn, Op, where } from 'sequelize';
import { Service } from 'typedi';

import {
    Client,
    ClientModel,
    SearchClientParams,
} from '../db/models/client.model';
import { DocumentModel } from '../db/models/document.model';

@Service()
export class ClientService {
    public findClientsBySearchClause({
        search,
        birthDate,
        status,
    }: SearchClientParams): Promise<Client[]> {
        const searchClause = search && {
            [Op.or]: [
                where(fn('lower', col('email')), {
                    // tslint:disable-next-line:no-any
                    [Op.like]: fn('lower', `%${search}%`) as any,
                }),
                where(fn('lower', col('firstName')), {
                    // tslint:disable-next-line:no-any
                    [Op.like]: fn('lower', `%${search}%`) as any,
                }),
                where(fn('lower', col('lastName')), {
                    // tslint:disable-next-line:no-any
                    [Op.like]: fn('lower', `%${search}%`) as any,
                }),
            ],
        };

        const birthDateSearchClause = birthDate && {
            birthDate,
        };

        const statusSearchClause = status &&
            // @ts-ignore
            status !== 'undefined' && {
                status,
            };

        return ClientModel.findAll({
            where: {
                ...statusSearchClause,
                ...birthDateSearchClause,
                ...searchClause,
            },
        });
    }

    public findClientByID(id: number): Promise<Client | null> {
        return ClientModel.findByPk(id, {
            include: [
                {
                    // @ts-ignore
                    model: DocumentModel,
                },
            ],
        });
    }

}
