import { UserEntity } from '../user/user.entity';
import { DoctorEntity } from '../user/doctor.entity';

export class AppointmentEntity {
  id: number;
  patient: UserEntity;
  patientId: number;
  doctor: DoctorEntity;
  doctorId: number;
  appointmentTime: Date;
  scheduleId: number;
  specialtyId: number;

  constructor(id: number, patient: UserEntity, doctor: DoctorEntity, appointmentTime: Date, scheduleId: number, specialtyId: number) {
    this.id = id;
    this.patient = patient;
    this.patientId = patient.id;
    this.doctor = doctor;
    this.doctorId = doctor.id;
    this.appointmentTime = appointmentTime;
    this.scheduleId = scheduleId;
    this.specialtyId = specialtyId;
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

  isSameDoctor(doctor: DoctorEntity): boolean {
    return this.doctor.id === doctor.id;
  }
}
