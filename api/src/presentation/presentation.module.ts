import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
})
export class PresentationModule {}