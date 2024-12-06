import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentService } from '../../../../domain/services/appointment/appointment.service';
import { AppointmentEntity } from '../../../../domain/entities/appointment/appointment';

@Injectable()
export class FindAppointmentByIdUseCase {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(id: number): Promise<AppointmentEntity> {
    try {
      return await this.appointmentService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Erro ao buscar agendamento');
    }
  }
}