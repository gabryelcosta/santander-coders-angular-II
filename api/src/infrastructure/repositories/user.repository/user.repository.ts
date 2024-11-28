import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    const user = await this.knex('users').where({ username }).first();
    return user ? new UserEntity(user.id, user.codUser, user.login, user.username, user.password) : undefined;
  }

  async findById(codUser: string): Promise<UserEntity | undefined> {
    const user = await this.knex('users').where({ codUser }).first();
    if (user) {
      const { id, ...userWithoutId } = user;
      return new UserEntity(userWithoutId.id, userWithoutId.codUser, userWithoutId.login, userWithoutId.username, userWithoutId.password);
    }
    return undefined;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.knex('users').whereNot({ username: 'SuperAdmin' }).select('*');
    return users.map(user => {
      const { id, ...userWithoutId } = user;
      return new UserEntity(userWithoutId.id, userWithoutId.codUser, userWithoutId.login, userWithoutId.username, userWithoutId.password);
    });
  }

  async existsByUsername(username: string): Promise<boolean> {
    const result = await this.knex('users').where({ username }).count('id as count').first();
    const count = Number(result.count);
    return count > 0;
  }

  async existsByLogin(login: string): Promise<boolean> {
    const result = await this.knex('users').where({ login }).count('id as count').first();
    const count = Number(result.count);
    return count > 0;
  }

  async count(): Promise<number> {
    const result = await this.knex('users').count('id as count').first();
    const count = Number(result.count);
    return count;
  }

  async save(user: UserEntity): Promise<void> {
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
        role_id: 3,
      });
    });
  }

  async create(login: string, username: string, password: string): Promise<UserEntity> {
    const date = new Date();
    const dateString = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
    const userCount = await this.count();
    const codUser = `${dateString}${userCount + 1}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserEntity(userCount + 1, codUser, login, username, hashedPassword);
    await this.save(newUser);
    return newUser;
  }

  async update(codUser: string, user: Partial<UserEntity>, roleId?: number): Promise<Partial<UserEntity & { roleId?: number }>> {
    const updatedFields: Partial<UserEntity & { roleId?: number }> = {};

    try {
      await this.knex.transaction(async trx => {
        const updateUser: Partial<UserEntity> = {};

        if (user.username) {
          updateUser.username = user.username;
          updatedFields.username = user.username;
        }

        if (user.password) {
          try {
            updateUser.password = await bcrypt.hash(user.password, 10);
            updatedFields.password = user.password;
          } catch (hashError) {
            throw hashError;
          }
        }

        if (Object.keys(updateUser).length > 0) {
          try {
            await trx('users').where({ codUser }).update(updateUser);
          } catch (updateUsersError) {
            throw updateUsersError;
          }
        }

        if (roleId !== undefined) {
          try {
            const userRecord = await trx('users').where({ codUser }).first();

            if (userRecord && userRecord.id) {
              try {
                await trx('user_roles').where({ user_id: userRecord.id }).update({ role_id: roleId });
                updatedFields.roleId = roleId;
              } catch (updateRolesError) {
                throw updateRolesError;
              }
            } else {
              throw new Error(`User with codUser ${codUser} not found.`);
            }
          } catch (fetchUserError) {
            throw fetchUserError;
          }
        }
      });

      return updatedFields;
    } catch (transactionError) {
      throw transactionError;
    }
  }

  async delete(codUser: string): Promise<void> {
    await this.knex('users').where({ codUser }).del();
  }
}