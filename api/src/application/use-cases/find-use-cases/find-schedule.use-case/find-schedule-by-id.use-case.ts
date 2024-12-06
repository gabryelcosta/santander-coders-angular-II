import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleService } from '../../../../domain/services/schedule/schedule.service';
import { Schedule } from '../../../../domain/entities/schedule/schedule';

@Injectable()
export class FindScheduleByIdUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async execute(id: number): Promise<Schedule> {
    try {
      return await this.scheduleService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao buscar horário');
    }
  }
}