import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Knex, knex } from 'knex';
import knexConfig from './knexfile';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  private knex: Knex;

  constructor() {
    this.knex = knex(knexConfig.development);
  }

  async onModuleInit() {
    const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, '..', 'database', 'ScheduleDataBase.db');
    const dbDir = path.dirname(dbPath);
    console.log(`Verificando a existência do banco de dados em: ${dbPath}`);
    console.log(`Diretório do banco de dados: ${dbDir}`);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log(`Diretório do banco de dados criado: ${dbDir}`);
    }

    if (!fs.existsSync(dbPath)) {
      console.log('Banco de dados não encontrado. Criando banco de dados...');
      fs.writeFileSync(dbPath, '');
      console.log('Banco de dados ScheduleDataBase.db criado com sucesso.');
    } else {
      console.log('Banco de dados ScheduleDataBase.db já existe.');
    }
  }
}