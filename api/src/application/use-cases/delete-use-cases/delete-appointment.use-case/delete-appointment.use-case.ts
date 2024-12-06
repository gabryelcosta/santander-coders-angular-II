import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentService } from '../../../../domain/services/appointment/appointment.service';

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(id: number): Promise<void> {
    try {
      await this.appointmentService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao excluir agendamento');
    }
  }
}