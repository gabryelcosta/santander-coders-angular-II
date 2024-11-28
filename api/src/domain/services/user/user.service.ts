import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../entities/user/user.entity';
import { UserRepository } from '../../../infrastructure/repositories/user.repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(username);
  }

  async findById(codUser: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findById(codUser);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async createUser(login: string, username: string, password: string): Promise<UserEntity> {
    if (await this.userRepository.existsByUsername(username)) {
      throw new BadRequestException('O nome de usuário já está em uso.');
    }

    if (await this.userRepository.existsByLogin(login)) {
      throw new BadRequestException('O login já está em uso.');
    }

    if (password.length < 6) {
      throw new BadRequestException('A senha deve ter pelo menos 6 caracteres.');
    }

    return this.userRepository.create(login, username, password);
  }

  async updateUser(codUser: string, user: Partial<UserEntity>, roleId?: number): Promise<Partial<UserEntity & { roleId?: number }>> {
    const existingUser = await this.userRepository.findById(codUser);
    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return this.userRepository.update(codUser, user, roleId);
  }

  async deleteUser(codUser: string): Promise<void> {
    const existingUser = await this.userRepository.findById(codUser);
    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    await this.userRepository.delete(codUser);
  }
}