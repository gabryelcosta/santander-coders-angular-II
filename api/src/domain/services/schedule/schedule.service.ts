import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleRepository } from '../../../infrastructure/repositories/schedule.repository/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule/schedule';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async create(schedule: Schedule): Promise<Schedule> {
    await this.scheduleRepository.save(schedule);
    return schedule;
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.findAll();
  }

  async findById(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }

  async update(id: number, newDate: Date, newStartTime: string, newEndTime: string): Promise<void> {
    await this.scheduleRepository.update(id, newDate, newStartTime, newEndTime);
  }

  async delete(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}