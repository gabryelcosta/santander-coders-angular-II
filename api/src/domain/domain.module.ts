import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment/appointment.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { UserService } from './services/user/user.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoleService } from './services/user/role.service';
import { AdminService } from './services/admin/admin.service';
import { SpecialtyService } from './services/user/specialty.service';


@Module({
  imports: [InfrastructureModule],
  providers: [AppointmentService, ScheduleService, UserService, RoleService, AdminService, SpecialtyService],
  exports: [UserService, RoleService, AppointmentService, AdminService, SpecialtyService],
})
export class DomainModule {}
