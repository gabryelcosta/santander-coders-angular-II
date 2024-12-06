import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { AppointmentEntity } from '../../../domain/entities/appointment/appointment';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { DoctorEntity } from '../../../domain/entities/user/doctor.entity';
import { SpecialtyEntity } from '../../../domain/entities/user/specialty.entity';

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
        const patient = await this.knex('users').where({ id: appointment.patient_id }).first();
        const doctor = await this.knex('users').where({ id: appointment.doctor_id }).first();
        const specialty = await this.knex('specialties').where({ id: appointment.specialty_id }).first();
        return new AppointmentEntity(
          appointment.id,
          new UserEntity(patient.id, patient.codUser, patient.login, patient.username, patient.password),
          new DoctorEntity(doctor.id, doctor.codUser, doctor.login, doctor.username, doctor.password, new SpecialtyEntity(specialty.id, specialty.name)),
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
    try {
      const appointments = await this.knex('appointments').select('*');
      return Promise.all(appointments.map(async appointment => {
        const patient = await this.knex('users').where({ id: appointment.patient_id }).first();
        const doctor = await this.knex('users').where({ id: appointment.doctor_id }).first();
        const specialty = await this.knex('specialties').where({ id: appointment.specialty_id }).first();
        return new AppointmentEntity(
          appointment.id,
          new UserEntity(patient.id, patient.codUser, patient.login, patient.username, patient.password),
          new DoctorEntity(doctor.id, doctor.codUser, doctor.login, doctor.username, doctor.password, new SpecialtyEntity(specialty.id, specialty.name)),
          new Date(appointment.appointment_time),
          appointment.schedule_id,
          appointment.specialty_id
        );
      }));
    } catch (error) {
      console.error('Error finding all appointments:', error);
      throw new Error('Error finding all appointments');
    }
  }

  async update(id: number, newAppointmentTime: Date): Promise<void> {
    try {
      await this.knex('appointments').where({ id }).update({
        appointment_time: newAppointmentTime,
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Error updating appointment');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.knex('appointments').where({ id }).del();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('Error deleting appointment');
    }
  }

  async findUserByCodUser(codUser: string): Promise<UserEntity | undefined> {
    try {
      const user = await this.knex('users').where({ codUser }).first();
      if (user) {
        return new UserEntity(user.id, user.codUser, user.login, user.username, user.password);
      }
      return undefined;
    } catch (error) {
      console.error('Error finding user by codUser:', error);
      throw new Error('Error finding user by codUser');
    }
  }

  async findUserRoleByCodUser(codUser: string): Promise<string | undefined> {
    try {
      const user = await this.knex('users').where({ codUser }).first();
      if (user) {
        const role = await this.knex('user_roles')
          .join('roles', 'user_roles.role_id', 'roles.id')
          .where('user_roles.user_id', user.id)
          .select('roles.name')
          .first();
        return role ? role.name : undefined;
      }
      return undefined;
    } catch (error) {
      console.error('Error finding user role by codUser:', error);
      throw new Error('Error finding user role by codUser');
    }
  }
}