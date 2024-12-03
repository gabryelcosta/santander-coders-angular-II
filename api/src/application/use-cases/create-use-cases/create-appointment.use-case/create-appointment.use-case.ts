import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { AppointmentService } from '../../../../domain/services/appointment/appointment.service';
import { AppointmentEntity } from '../../../../domain/entities/appointment/appointment';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(id: number, patientCodUser: string, doctorCodUser: string, appointmentTime: Date): Promise<AppointmentEntity> {
    try {
      if (appointmentTime <= new Date()) {
        throw new BadRequestException('A data e hora da consulta devem ser no futuro.');
      }

      return await this.appointmentService.createAppointment(id, patientCodUser, doctorCodUser, appointmentTime);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Erro ao criar consulta');
    }
  }
}