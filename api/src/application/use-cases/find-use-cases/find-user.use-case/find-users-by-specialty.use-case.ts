import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SpecialtyService } from '../../../../domain/services/user/specialty.service';
import { UserEntity } from '../../../../domain/entities/user/user.entity';

@Injectable()
export class FindUsersBySpecialtyUseCase {
  constructor(private specialtyService: SpecialtyService) {}

  async execute(specialtyId: number): Promise<UserEntity[]> {
    try {
      const users = await this.specialtyService.findUsersBySpecialty(specialtyId);
      if (!users || users.length === 0) {
        throw new NotFoundException('Especialidade não encontrada ou sem usuários associados.');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuários por especialidade');
    }
  }
}