import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment/appointment.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { UserService } from './services/user/user.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';


@Module({
  imports: [InfrastructureModule],
  providers: [AppointmentService, ScheduleService, UserService],
  exports: [UserService, AppointmentService],
})
export class DomainModule {}
