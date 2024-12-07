import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { AppointmentEntity } from '../../../domain/entities/appointment/appointment';

@Injectable()
export class AppointmentRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async save(appointment: AppointmentEntity): Promise<void> {

    if (!appointment.patientId) {
      console.error('ID do patient está ausente');
      throw new Error('ID do patient é obrigatório');
    }

    if (!appointment.scheduleId) {
      console.error('Schedule ID está ausente');
      throw new Error('Schedule ID é obrigatório');
    }

    try {
      const schedule = await this.knex('schedules').where({ id: appointment.scheduleId }).first();
      if (!schedule) {
        console.error('Schedule não encontrado para o ID:', appointment.scheduleId);
        throw new Error('Schedule não encontrado');
      }

      const appointmentTime = new Date(`${schedule.date}T${schedule.start_time}`);

      await this.knex('appointments').insert({
        patient_id: appointment.patientId,
        doctor_id: appointment.doctorId,
        schedule_id: appointment.scheduleId,
        specialty_id: appointment.specialtyId,
        appointment_time: appointmentTime,
      });

    } catch (error) {
      console.error('Error saving appointment:', error);
      throw new Error('Error saving appointment');
    }
  }

  async findById(id: number): Promise<AppointmentEntity | undefined> {
    try {
      const appointment = await this.knex('appointments').where({ id }).first();
      if (appointment) {
        return new AppointmentEntity(
          appointment.id,
          appointment.patient_id,
          appointment.doctor_id,
          new Date(appointment.appointment_time),
          appointment.schedule_id,
          appointment.specialty_id
        );
      }
      return undefined;
    } catch (error) {
      console.error('Error finding appointment by ID:', error);
      throw new Error('Error finding appointment by ID');
    }
  }

  async findAll(): Promise<AppointmentEntity[]> {
    console.log('Finding all appointments');
    try {
      const appointments = await this.knex('appointments').select('*');
      return appointments.map(appointment => new AppointmentEntity(
        appointment.id,
        appointment.patient_id,
        appointment.doctor_id,
        new Date(appointment.appointment_time),
        appointment.schedule_id,
        appointment.specialty_id
      ));
    } catch (error) {
      console.error('Error finding all appointments:', error);
      throw new Error('Error finding all appointments');
    }
  }

  async update(id: number, newAppointmentTime: Date): Promise<void> {
    console.log('Updating appointment ID:', id, 'with new time:', newAppointmentTime);
    try {
      await this.knex('appointments').where({ id }).update({
        appointment_time: newAppointmentTime,
      });
      console.log('Appointment updated successfully');
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Error updating appointment');
    }
  }

  async delete(id: number): Promise<void> {
    console.log('Deleting appointment ID:', id);
    try {
      await this.knex('appointments').where({ id }).del();
      console.log('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('Error deleting appointment');
    }
  }
}