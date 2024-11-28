import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../../../../domain/services/user/user.service';
import { UserEntity } from '../../../../domain/entities/user/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(login: string, username: string, password: string): Promise<UserEntity> {
    try {
      return await this.userService.createUser(login, username, password);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Erro ao criar usuário');
    }
  }
}