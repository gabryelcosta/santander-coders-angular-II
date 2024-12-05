import { Controller, Get, Param, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FindAllSpecialtyUseCase } from '../../../application/use-cases/find-use-cases/find-user.use-case/find-all-specialty.use-case';
import { FindUsersBySpecialtyUseCase } from '../../../application/use-cases/find-use-cases/find-user.use-case/find-users-by-specialty.use-case';
import { SpecialtyEntity } from '../../../domain/entities/user/specialty.entity';
import { UserEntity } from '../../../domain/entities/user/user.entity';

@Controller('specialties')
export class SpecialtyController {
  constructor(
    private readonly findAllSpecialtyUseCase: FindAllSpecialtyUseCase,
    private readonly findUsersBySpecialtyUseCase: FindUsersBySpecialtyUseCase
  ) {}

  @Get()
  async findAll(): Promise<SpecialtyEntity[]> {
    try {
      return await this.findAllSpecialtyUseCase.execute();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar especialidades');
    }
  }

  @Get(':id/users')
  async findUsersBySpecialty(@Param('id') id: number): Promise<UserEntity[]> {
    try {
      return await this.findUsersBySpecialtyUseCase.execute(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Erro ao buscar usuários por especialidade');
    }
  }
}