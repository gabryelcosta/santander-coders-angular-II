import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentService } from '../../../../domain/services/appointment/appointment.service';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(id: number, newAppointmentTime: Date): Promise<void> {
    try {
      await this.appointmentService.update(id, newAppointmentTime);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Erro ao atualizar agendamento');
    }
  }
}