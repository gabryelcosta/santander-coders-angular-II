import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-use-cases/create-user.use-case/create-user.use-case';
import { FindUserByIdUseCase } from './use-cases/find-use-cases/find-user.use-case/find-user-by-id.use-case';
import { FindAllUsersUseCase } from './use-cases/find-use-cases/find-user.use-case/find-all-users.use-case';
import { UpdateUserUseCase } from './use-cases/update-use-cases/update-user.use-case/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-use-cases/delete-user.use-case/delete-user.use-case';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class ApplicationModule {}