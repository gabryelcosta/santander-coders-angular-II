import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { Schedule } from '../../../domain/entities/schedule/schedule';

@Injectable()
export class ScheduleRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async save(schedule: Schedule): Promise<void> {
    try {
      const doctor = await this.knex('users').where({ id: schedule.doctorId }).first();
      if (!doctor) {
        console.error('Doctor not found for ID:', schedule.doctorId);
        throw new Error('Doctor not found');
      }

      const specialty = await this.knex('specialties').where({ id: schedule.specialtyId }).first();
      if (!specialty) {
        console.error('Specialty not found for ID:', schedule.specialtyId);
        throw new Error('Specialty not found');
      }

      const [newSchedule] = await this.knex('schedules').insert({
        doctor_id: schedule.doctorId,
        specialty_id: schedule.specialtyId,
        date: schedule.date,
        start_time: schedule.startTime,
        end_time: schedule.endTime,
      }).returning(['id']);

      schedule.id = newSchedule.id;

    } catch (error) {
      console.error('Error saving schedule:', error);
      throw new Error('Error saving schedule');
    }
  }


  async findById(id: number): Promise<Schedule | undefined> {
    try {
      const schedule = await this.knex('schedules').where({ id }).first();
      if (schedule) {
        const doctor = await this.knex('users').where({ id: schedule.doctor_id }).first();
        const specialty = await this.knex('specialties').where({ id: schedule.specialty_id }).first();
        return new Schedule(
          schedule.id,
          schedule.doctor_id,
          schedule.specialty_id,
          schedule.date,
          schedule.start_time,
          schedule.end_time
        );
      }
      return undefined;
    } catch (error) {
      console.error('Error finding schedule by ID:', error);
      throw new Error('Error finding schedule by ID');
    }
  }

  async findAll(): Promise<Schedule[]> {
    try {
      const schedules = await this.knex('schedules').select('*');
      return Promise.all(schedules.map(async schedule => {
        const doctor = await this.knex('users').where({ id: schedule.doctor_id }).first();
        const specialty = await this.knex('specialties').where({ id: schedule.specialty_id }).first();
        return new Schedule(
          schedule.id,
          schedule.doctor_id,
          schedule.specialty_id,
          schedule.date,
          schedule.start_time,
          schedule.end_time
        );
      }));
    } catch (error) {
      console.error('Error finding all schedules:', error);
      throw new Error('Error finding all schedules');
    }
  }

  async update(id: number, newDate: Date, newStartTime: string, newEndTime: string): Promise<void> {
    try {
      await this.knex('schedules').where({ id }).update({
        date: newDate,
        start_time: newStartTime,
        end_time: newEndTime,
      });
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw new Error('Error updating schedule');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.knex('schedules').where({ id }).del();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      throw new Error('Error deleting schedule');
    }
  }
}
