import { Injectable, BadRequestException } from '@nestjs/common';
import { ScheduleService } from '../../../../domain/services/schedule/schedule.service';

@Injectable()
export class UpdateScheduleUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async execute(id: number, newDate: Date, newStartTime: string, newEndTime: string): Promise<void> {
    try {
      await this.scheduleService.update(id, newDate, newStartTime, newEndTime);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Erro ao atualizar horário');
    }
  }
}