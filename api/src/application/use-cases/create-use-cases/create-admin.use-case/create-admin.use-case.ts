import { Injectable, BadRequestException } from '@nestjs/common';
import { AdminService } from '../../../../domain/services/admin/admin.service';
import { UserEntity } from '../../../../domain/entities/user/user.entity';

@Injectable()
export class CreateAdminUseCase {
  constructor(private readonly adminService: AdminService) {}

  async execute(login: string, username: string, password: string, roleId: number, specialtyId?: number): Promise<UserEntity> {
    try {
      return await this.adminService.createUser(login, username, password, roleId, specialtyId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Erro ao criar usuário administrador');
    }
  }
}