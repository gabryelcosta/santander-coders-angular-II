import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-use-cases/create-user.use-case/create-user.use-case';
import { FindUserByIdUseCase } from './use-cases/find-use-cases/find-user.use-case/find-user-by-id.use-case';
import { FindAllUsersUseCase } from './use-cases/find-use-cases/find-user.use-case/find-all-users.use-case';
import { UpdateUserUseCase } from './use-cases/update-use-cases/update-user.use-case/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-use-cases/delete-user.use-case/delete-user.use-case';
import { DomainModule } from 'src/domain/domain.module';
import { CreateAppointmentUseCase } from './use-cases/create-use-cases/create-appointment.use-case/create-appointment.use-case';
import { FindAppointmentByIdUseCase } from './use-cases/find-use-cases/find-appointment.use-case/find-appointment-by-id.use-case';
import { FindAllAppointmentsUseCase } from './use-cases/find-use-cases/find-appointment.use-case/find-all-appointment-use-case';
import { UpdateAppointmentUseCase } from './use-cases/update-use-cases/update-appointment.use-case/update-appointment.use-case';
import { DeleteAppointmentUseCase } from './use-cases/delete-use-cases/delete-appointment.use-case/delete-appointment.use-case';
import { FindAllRoleUseCase } from './use-cases/find-use-cases/find-user.use-case/find-all-role.use-case';
import { CreateAdminUseCase } from './use-cases/create-use-cases/create-admin.use-case/create-admin.use-case';
import { FindAllSpecialtyUseCase } from './use-cases/find-use-cases/find-user.use-case/find-all-specialty.use-case';
import { FindUsersBySpecialtyUseCase } from './use-cases/find-use-cases/find-user.use-case/find-users-by-specialty.use-case';
import { CreateScheduleUseCase } from './use-cases/create-use-cases/create-schedule.use-case/create-schedule.use-case';
import { FindScheduleByIdUseCase } from './use-cases/find-use-cases/find-schedule.use-case/find-schedule-by-id.use-case';
import { FindAllSchedulesUseCase } from './use-cases/find-use-cases/find-schedule.use-case/find-all-schedules.use-case';
import { UpdateScheduleUseCase } from './use-cases/update-use-cases/update-schedule.use-case/update-schedule.use-case';
import { DeleteScheduleUseCase } from './use-cases/delete-use-cases/delete-schedule.use-case/delete-schedule.use-case';


@Module({
  imports: [DomainModule],
  providers: [
    CreateUserUseCase,
    CreateAdminUseCase,
    CreateAppointmentUseCase,
    CreateScheduleUseCase,
    FindUserByIdUseCase,
    FindScheduleByIdUseCase,
    FindAppointmentByIdUseCase,
    FindAllUsersUseCase,
    FindAllSchedulesUseCase,
    FindAllAppointmentsUseCase,
    FindAllRoleUseCase,
    FindAllSpecialtyUseCase,
    FindUsersBySpecialtyUseCase,
    UpdateUserUseCase,
    UpdateAppointmentUseCase,
    UpdateScheduleUseCase,
    DeleteUserUseCase,
    DeleteScheduleUseCase,
    DeleteAppointmentUseCase
  ],
  exports: [
    CreateUserUseCase,
    CreateAdminUseCase,
    CreateAppointmentUseCase,
    CreateScheduleUseCase,
    FindUserByIdUseCase,
    FindScheduleByIdUseCase,
    FindAppointmentByIdUseCase,
    FindAllUsersUseCase,
    FindAllSchedulesUseCase,
    FindAllAppointmentsUseCase,
    FindAllRoleUseCase,
    FindAllSpecialtyUseCase,
    FindUsersBySpecialtyUseCase,
    UpdateUserUseCase,
    UpdateAppointmentUseCase,
    UpdateScheduleUseCase,
    DeleteUserUseCase,
    DeleteScheduleUseCase,
    DeleteAppointmentUseCase
  ],
})
export class ApplicationModule {}