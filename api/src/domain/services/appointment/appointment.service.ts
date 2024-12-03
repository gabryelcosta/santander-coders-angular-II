import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { AppointmentEntity } from '../../entities/appointment/appointment';
import { AppointmentRepository } from '../../../infrastructure/repositories/appointment.repository/appointment.repository';

@Injectable()
export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async findById(id: number): Promise<AppointmentEntity | undefined> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada.');
    }
    return appointment;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.findAll();
  }

  async createAppointment(id: number, patientCodUser: string, doctorCodUser: string, appointmentTime: Date): Promise<AppointmentEntity> {
    if (appointmentTime <= new Date()) {
      throw new BadRequestException('A data e hora da consulta devem ser no futuro.');
    }

    const patient = await this.appointmentRepository.findUserByCodUser(patientCodUser);
    const doctor = await this.appointmentRepository.findUserByCodUser(doctorCodUser);

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado.');
    }

    if (!doctor) {
      throw new NotFoundException('Médico não encontrado.');
    }

    const patientRole = await this.appointmentRepository.findUserRoleByCodUser(patientCodUser);
    const doctorRole = await this.appointmentRepository.findUserRoleByCodUser(doctorCodUser);

    if (patientRole !== 'Paciente') {
      throw new BadRequestException('O usuário especificado não é um paciente.');
    }

    if (doctorRole !== 'Medico') {
      throw new BadRequestException('O usuário especificado não é um médico.');
    }

    const appointment = new AppointmentEntity(id, patient, doctor, appointmentTime);
    await this.appointmentRepository.save(appointment);
    return appointment;
  }

  async rescheduleAppointment(id: number, newAppointmentTime: Date): Promise<void> {
    const appointment = await this.findById(id);
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada.');
    }

    if (newAppointmentTime <= new Date()) {
      throw new BadRequestException('A nova data e hora da consulta devem ser no futuro.');
    }

    appointment.reschedule(newAppointmentTime);
    await this.appointmentRepository.update(id, newAppointmentTime);
  }

  async deleteAppointment(id: number): Promise<void> {
    const appointment = await this.findById(id);
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada.');
    }
    await this.appointmentRepository.delete(id);
  }
}