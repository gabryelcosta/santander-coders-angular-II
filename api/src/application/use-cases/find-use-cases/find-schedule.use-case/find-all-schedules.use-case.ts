import { Injectable } from '@nestjs/common';
import { ScheduleService } from '../../../../domain/services/schedule/schedule.service';
import { Schedule } from '../../../../domain/entities/schedule/schedule';

@Injectable()
export class FindAllSchedulesUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async execute(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }
}