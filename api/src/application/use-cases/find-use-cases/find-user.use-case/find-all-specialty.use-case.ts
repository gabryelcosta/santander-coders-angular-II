import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SpecialtyService } from '../../../../domain/services/user/specialty.service';
import { SpecialtyEntity } from '../../../../domain/entities/user/specialty.entity';

@Injectable()
export class FindAllSpecialtyUseCase {
  constructor(private specialtyService: SpecialtyService) {}

  async execute(): Promise<SpecialtyEntity[]> {
    try {
      return await this.specialtyService.getAllSpecialties();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao executar caso de uso de buscar todas as especialidades');
    }
  }
}