import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ApplicationModule } from 'src/application/application.module';
import { AppointmentController } from './appointment/appointment.controller';


@Module({
  imports: [ApplicationModule],
  controllers: [UserController, AppointmentController],
})
export class PresentationModule {}