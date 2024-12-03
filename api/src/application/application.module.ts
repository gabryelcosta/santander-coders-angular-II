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
import { RescheduleAppointmentUseCase } from './use-cases/update-use-cases/update-appointment.use-case/update-appointment.use-case';
import { DeleteAppointmentUseCase } from './use-cases/delete-use-cases/delete-appointment.use-case/delete-appointment.use-case';


@Module({
  imports: [DomainModule],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateAppointmentUseCase,
    FindAppointmentByIdUseCase,
    FindAllAppointmentsUseCase,
    RescheduleAppointmentUseCase,
    DeleteAppointmentUseCase
  ],
  exports: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateAppointmentUseCase,
    FindAppointmentByIdUseCase,
    FindAllAppointmentsUseCase,
    RescheduleAppointmentUseCase,
    DeleteAppointmentUseCase
  ],
})
export class ApplicationModule {}