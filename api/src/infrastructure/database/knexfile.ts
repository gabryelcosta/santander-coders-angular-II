import { Knex } from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const databasePath = process.env.DATABASE_PATH || path.resolve(__dirname, '..', 'database', 'ScheduleDataBase.db');

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databasePath,
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: databasePath,
    },
    useNullAsDefault: true,
  },
};

export default config;