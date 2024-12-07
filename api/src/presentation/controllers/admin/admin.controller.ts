import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { CreateAdminUseCase } from '../../../application/use-cases/create-use-cases/create-admin.use-case/create-admin.use-case';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { LocalAuthGuard } from 'src/application/auth/local-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly createAdminUseCase: CreateAdminUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('create')
  async createAdmin(
    @Body('login') login: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('roleId') roleId: number,
    @Body('specialtyId') specialtyId?: number
  ): Promise<UserEntity> {
    return this.createAdminUseCase.execute(login, username, password, roleId, specialtyId);
  }
}