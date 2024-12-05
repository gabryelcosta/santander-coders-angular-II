import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { RoleEntity } from '../../../domain/entities/user/role.entity';

@Injectable()
export class RoleRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.knex('roles').select('*');
    return roles.map(role => new RoleEntity(role.id, role.name));
  }
}