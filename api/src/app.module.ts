import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { DatabaseModule } from './infrastructure/database/database.module/database.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule, DomainModule, ApplicationModule, InfrastructureModule, PresentationModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}