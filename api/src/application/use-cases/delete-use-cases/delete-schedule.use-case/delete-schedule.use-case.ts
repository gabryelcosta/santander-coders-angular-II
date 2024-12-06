import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleService } from '../../../../domain/services/schedule/schedule.service';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async execute(id: number): Promise<void> {
    try {
      await this.scheduleService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao excluir horário');
    }
  }
}