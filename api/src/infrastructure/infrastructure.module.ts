import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository/user.repository';
import { AppointmentRepository } from './repositories/appointment.repository/appointment.repository';

@Module({
  providers: [UserRepository, AppointmentRepository],
  exports: [UserRepository, AppointmentRepository]
})
export class InfrastructureModule {}
