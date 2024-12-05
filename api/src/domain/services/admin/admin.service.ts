import { Injectable, BadRequestException } from '@nestjs/common';
import { AdminRepository } from '../../../infrastructure/repositories/admin.repository/admin.repository';
import { UserEntity } from '../../../domain/entities/user/user.entity';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async createUser(login: string, username: string, password: string, roleId: number, specialtyId?: number): Promise<UserEntity> {
    console.log('Dados recebidos no backend:', { login, username, password, roleId, specialtyId });

    if (!login || login.trim().length === 0) {
      throw new BadRequestException('O login não pode ser vazio.');
    }

    if (!username || username.trim().length === 0) {
      throw new BadRequestException('O nome de usuário não pode ser vazio.');
    }

    if (await this.adminRepository.existsByLogin(login)) {
      throw new BadRequestException('O login já está em uso.');
    }

    if (password.length < 6) {
      throw new BadRequestException('A senha deve ter pelo menos 6 caracteres.');
    }

    if (roleId === 3 && specialtyId) {
      throw new BadRequestException('Pacientes não podem ter especialidades.');
    }

    console.log('Chamando o repositório com os dados:', { login, username, password, roleId, specialtyId });
    return this.adminRepository.createUser(login, username, password, roleId, specialtyId);
  }
}