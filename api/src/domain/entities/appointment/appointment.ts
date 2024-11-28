import { UserEntity } from '../user/user.entity';

export class AppointmentEntity {
  id: number;
  patient: UserEntity;
  doctor: UserEntity;
  appointmentTime: Date;

  constructor(id: number, patient: UserEntity, doctor: UserEntity, appointmentTime: Date) {
    this.id = id;
    this.patient = patient;
    this.doctor = doctor;
    this.appointmentTime = appointmentTime;
  }

  isFutureAppointment(): boolean {
    return this.appointmentTime > new Date();
  }

  reschedule(newAppointmentTime: Date): void {
    if (newAppointmentTime <= new Date()) {
      throw new Error('A nova data e hora da consulta deve ser no futuro.');
    }
    this.appointmentTime = newAppointmentTime;
  }

  isSamePatient(patient: UserEntity): boolean {
    return this.patient.id === patient.id;
  }

  isSameDoctor(doctor: UserEntity): boolean {
    return this.doctor.id === doctor.id;
  }
}