import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentService } from '../../../../domain/services/appointment/appointment.service';
import { AppointmentEntity } from '../../../../domain/entities/appointment/appointment';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    try {
      return await this.appointmentService.create(appointment);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Erro ao criar agendamento');
    }
  }
}