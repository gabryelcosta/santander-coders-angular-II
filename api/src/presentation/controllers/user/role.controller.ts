import { Controller, Get, UseGuards } from '@nestjs/common';
import { FindAllRoleUseCase } from '../../../application/use-cases/find-use-cases/find-user.use-case/find-all-role.use-case';
import { RoleEntity } from '../../../domain/entities/user/role.entity';
import { LocalAuthGuard } from 'src/application/auth/local-auth.guard';

@Controller('roles')
export class RoleController {
  constructor(private getAllRolesUseCase: FindAllRoleUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getAllRoles(): Promise<RoleEntity[]> {
    return this.getAllRolesUseCase.execute();
  }
}