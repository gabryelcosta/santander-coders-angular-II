import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../../../domain/services/user/user.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(codUser: string): Promise<void> {
    try {
      await this.userService.deleteUser(codUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao deletar usuário');
    }
  }
}