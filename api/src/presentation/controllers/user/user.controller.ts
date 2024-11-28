import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-use-cases/create-user.use-case/create-user.use-case';
import { FindUserByIdUseCase } from '../../../application/use-cases/find-use-cases/find-user.use-case/find-user-by-id.use-case';
import { FindAllUsersUseCase } from '../../../application/use-cases/find-use-cases/find-user.use-case/find-all-users.use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/update-use-cases/update-user.use-case/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/delete-use-cases/delete-user.use-case/delete-user.use-case';
import { UserEntity } from '../../../domain/entities/user/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('create')
  async createUser(
    @Body('login') login: string,
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<UserEntity> {
    return this.createUserUseCase.execute(login, username, password);
  }

  @Get(':codUser')
  async findUserById(@Param('codUser') codUser: string): Promise<UserEntity | undefined> {
    return this.findUserByIdUseCase.execute(codUser);
  }

  @Get()
  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.findAllUsersUseCase.execute();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar todos os usuários');
    }
  }

  @Put(':codUser')
  async updateUser(
    @Param('codUser') codUser: string,
    @Body() user: Partial<UserEntity>,
    @Body('roleId') roleId?: number
  ): Promise<Partial<UserEntity & { roleId?: number }>> {
    return this.updateUserUseCase.execute(codUser, user, roleId);
  }

  @Delete(':codUser')
  async deleteUser(@Param('codUser') codUser: string): Promise<void> {
    return this.deleteUserUseCase.execute(codUser);
  }
}