import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SpecialtyRepository } from '../../../infrastructure/repositories/user.repository/specialty.repository';
import { SpecialtyEntity } from '../../entities/user/specialty.entity';
import { UserEntity } from '../../entities/user/user.entity';

@Injectable()
export class SpecialtyService {
  constructor(private specialtyRepository: SpecialtyRepository) {}

  async getAllSpecialties(): Promise<SpecialtyEntity[]> {
    try {
      return await this.specialtyRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar especialidades');
    }
  }

  async findUsersBySpecialty(specialtyId: number): Promise<UserEntity[]> {
    try {
      const users = await this.specialtyRepository.findUsersBySpecialty(specialtyId);
      if (!users || users.length === 0) {
        throw new NotFoundException('Especialidade não encontrada ou sem usuários associados.');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuários por especialidade');
    }
  }
}