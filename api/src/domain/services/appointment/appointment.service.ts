import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from '../../../infrastructure/repositories/appointment.repository/appointment.repository';
import { AppointmentEntity } from '../../../domain/entities/appointment/appointment';

@Injectable()
export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async create(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    await this.appointmentRepository.save(appointment);
    return appointment;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.findAll();
  }

  async findById(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(id: number, newAppointmentTime: Date): Promise<void> {
    await this.appointmentRepository.update(id, newAppointmentTime);
  }

  async delete(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}