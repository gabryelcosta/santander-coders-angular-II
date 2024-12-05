import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { SpecialtyEntity } from '../../../domain/entities/user/specialty.entity';
import { UserEntity } from '../../../domain/entities/user/user.entity';

@Injectable()
export class SpecialtyRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async findAll(): Promise<SpecialtyEntity[]> {
    return this.knex('specialties').select('*');
  }

  async findUsersBySpecialty(specialtyId: number): Promise<UserEntity[]> {
    try {
      const users = await this.knex('users')
        .join('user_specialties', 'users.id', 'user_specialties.user_id')
        .where('user_specialties.specialty_id', specialtyId)
        .select('users.id', 'users.username');
      return users;
    } catch (error) {
      throw error;
    }
  }
}