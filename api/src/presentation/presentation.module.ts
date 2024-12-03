import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { ApplicationModule } from 'src/application/application.module';
import { AppointmentController } from './controllers/appointment/appointment.controller';


@Module({
  imports: [ApplicationModule],
  controllers: [UserController, AppointmentController],
})
export class PresentationModule {}