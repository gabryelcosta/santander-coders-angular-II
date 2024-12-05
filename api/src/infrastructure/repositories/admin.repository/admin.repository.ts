import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async existsByLogin(login: string): Promise<boolean> {
    const result = await this.knex('users').where({ login }).count('id as count').first();
    const count = Number(result.count);
    return count > 0;
  }

  async save(user: UserEntity, roleId: number, specialtyId?: number): Promise<void> {
    try {
      await this.knex.transaction(async trx => {
        await trx('users').insert({
          id: user.id,
          codUser: user.codUser,
          login: user.login,
          username: user.username,
          password: user.password,
        });

        await trx('user_roles').insert({
          user_id: user.id,
          role_id: roleId,
        });

        if (specialtyId) {
          await trx('user_specialties').insert({
            user_id: user.id,
            specialty_id: specialtyId,
          });
        }
      });
    } catch (error) {
      console.error('Erro ao salvar usuário no repositório:', error);
      throw new InternalServerErrorException('Erro ao salvar usuário no repositório');
    }
  }

  async createUser(login: string, username: string, password: string, roleId: number, specialtyId?: number): Promise<UserEntity> {
    console.log('Dados recebidos no repositório:', { login, username, password, roleId, specialtyId });

    const date = new Date();
    const dateString = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
    const userCount = await this.count();
    const codUser = `${dateString}${userCount + 1}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserEntity(userCount + 1, codUser, login, username, hashedPassword);
    await this.save(newUser, roleId, specialtyId);

    return newUser;
  }

  private async count(): Promise<number> {
    const result = await this.knex('users').count({ count: '*' }).first();
    return result ? parseInt(result.count, 10) : 0;
  }
}