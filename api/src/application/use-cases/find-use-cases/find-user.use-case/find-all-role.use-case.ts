import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RoleService } from '../../../../domain/services/user/role.service';
import { RoleEntity } from '../../../../domain/entities/user/role.entity';

@Injectable()
export class FindAllRoleUseCase {
  constructor(private roleService: RoleService) {}

  async execute(): Promise<RoleEntity[]> {
    try {
      return await this.roleService.getAllRoles();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao executar caso de uso de buscar todas as roles');
    }
  }
}