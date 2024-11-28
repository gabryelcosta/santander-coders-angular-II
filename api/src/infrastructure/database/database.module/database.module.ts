import { Module, Global } from '@nestjs/common';
import { knexProvider } from '../database.providers/database.providers';
import { DatabaseInitService } from '../database-init.service';

@Global()
@Module({
  providers: [knexProvider, DatabaseInitService],
  exports: [knexProvider],
})
export class DatabaseModule {}