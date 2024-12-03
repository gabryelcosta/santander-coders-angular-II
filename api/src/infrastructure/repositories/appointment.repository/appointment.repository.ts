import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { AppointmentEntity } from '../../../domain/entities/appointment/appointment';
import { UserEntity } from '../../../domain/entities/user/user.entity';

@Injectable()
export class AppointmentRepository {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async save(appointment: AppointmentEntity): Promise<void> {
    await this.knex('appointments').insert({
      id: appointment.id,
      patient_id: appointment.patient.id,
      doctor_id: appointment.doctor.id,
      appointment_time: appointment.appointmentTime,
    });
  }

  async findById(id: number): Promise<AppointmentEntity | undefined> {
    const appointment = await this.knex('appointments').where({ id }).first();
    if (appointment) {
      const patient = await this.knex('users').where({ id: appointment.patient_id }).first();
      const doctor = await this.knex('users').where({ id: appointment.doctor_id }).first();
      return new AppointmentEntity(
        appointment.id,
        new UserEntity(patient.id, patient.codUser, patient.login, patient.username, patient.password),
        new UserEntity(doctor.id, doctor.codUser, doctor.login, doctor.username, doctor.password),
        new Date(appointment.appointment_time)
      );
    }
    return undefined;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    const appointments = await this.knex('appointments').select('*');
    return Promise.all(appointments.map(async appointment => {
      const patient = await this.knex('users').where({ id: appointment.patient_id }).first();
      const doctor = await this.knex('users').where({ id: appointment.doctor_id }).first();
      return new AppointmentEntity(
        appointment.id,
        new UserEntity(patient.id, patient.codUser, patient.login, patient.username, patient.password),
        new UserEntity(doctor.id, doctor.codUser, doctor.login, doctor.username, doctor.password),
        new Date(appointment.appointment_time)
      );
    }));
  }

  async update(id: number, newAppointmentTime: Date): Promise<void> {
    await this.knex('appointments').where({ id }).update({
      appointment_time: newAppointmentTime,
    });
  }

  async delete(id: number): Promise<void> {
    await this.knex('appointments').where({ id }).del();
  }

  async findUserByCodUser(codUser: string): Promise<UserEntity | undefined> {
    const user = await this.knex('users').where({ codUser }).first();
    if (user) {
      return new UserEntity(user.id, user.codUser, user.login, user.username, user.password);
    }
    return undefined;
  }

  async findUserRoleByCodUser(codUser: string): Promise<string | undefined> {
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
  }
}