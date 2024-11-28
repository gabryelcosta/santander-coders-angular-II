import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../../../domain/services/user/user.service';
import { UserEntity } from '../../../../domain/entities/user/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(codUser: string, user: Partial<UserEntity>, roleId?: number): Promise<Partial<UserEntity & { roleId?: number }>> {
    try {
      return await this.userService.updateUser(codUser, user, roleId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao atualizar usuário');
    }
  }
}