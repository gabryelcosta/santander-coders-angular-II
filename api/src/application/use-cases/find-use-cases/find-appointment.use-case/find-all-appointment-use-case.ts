import { Injectable } from '@nestjs/common';
import { AppointmentService } from '../../../../domain/services/appointment/appointment.service';
import { AppointmentEntity } from '../../../../domain/entities/appointment/appointment';

@Injectable()
export class FindAllAppointmentsUseCase {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(): Promise<AppointmentEntity[]> {
    return this.appointmentService.findAll();
  }
}