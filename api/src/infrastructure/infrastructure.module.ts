import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository/user.repository';
import { AppointmentRepository } from './repositories/appointment.repository/appointment.repository';
import { RoleRepository } from './repositories/user.repository/role.repository';
import { AdminRepository } from './repositories/admin.repository/admin.repository';
import { SpecialtyRepository } from './repositories/user.repository/specialty.repository';
import { ScheduleRepository } from './repositories/schedule.repository/schedule.repository';

@Module({
  providers: [UserRepository, RoleRepository, SpecialtyRepository, AdminRepository, AppointmentRepository, ScheduleRepository],
  exports: [UserRepository, RoleRepository, SpecialtyRepository, AdminRepository, AppointmentRepository, ScheduleRepository]
})
export class InfrastructureModule {}
