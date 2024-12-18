import { Injectable, BadRequestException } from '@nestjs/common';
import { ScheduleService } from '../../../../domain/services/schedule/schedule.service';
import { Schedule } from '../../../../domain/entities/schedule/schedule';

@Injectable()
export class CreateScheduleUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async execute(schedule: Schedule): Promise<Schedule> {
    try {
      return await this.scheduleService.create(schedule);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Erro ao criar horário');
    }
  }
}