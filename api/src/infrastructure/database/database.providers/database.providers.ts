import { knex, Knex } from 'knex';
import knexConfig from '../knexfile';

export const knexProvider = {
  provide: 'KnexConnection',
  useFactory: async (): Promise<Knex> => {
    return knex(knexConfig.development);
  },
};