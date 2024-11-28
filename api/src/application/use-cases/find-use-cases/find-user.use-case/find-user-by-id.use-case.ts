import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../../../domain/services/user/user.service';
import { UserEntity } from '../../../../domain/entities/user/user.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(codUser: string): Promise<UserEntity | undefined> {
    try {
      return await this.userService.findById(codUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao buscar usuário por ID');
    }
  }
}