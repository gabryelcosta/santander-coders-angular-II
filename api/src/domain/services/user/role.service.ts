import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../../infrastructure/repositories/user.repository/role.repository';
import { RoleEntity } from '../../entities/user/role.entity';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<RoleEntity[]> {
    return this.roleRepository.findAll();
  }
}