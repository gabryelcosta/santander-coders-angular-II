import { DoctorEntity } from '../user/doctor.entity';

export class Schedule {
  id: number;
  doctor: DoctorEntity;
  doctorId: number;
  date: Date;
  startTime: string;
  endTime: string;
  specialtyId: number;

  constructor(
    id: number,
    doctor: DoctorEntity,
    date: Date,
    startTime: string,
    endTime: string,
    specialtyId: number
  ) {
    this.id = id;
    this.doctor = doctor;
    this.doctorId = doctor.id;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.specialtyId = specialtyId;
  }

  isFutureSchedule(): boolean {
    const now = new Date();
    const scheduleDate = new Date(this.date);
    return scheduleDate > now;
  }

  isTimeWithinSchedule(time: string): boolean {
    return time >= this.startTime && time <= this.endTime;
  }

  reschedule(newDate: Date, newStartTime: string, newEndTime: string): void {
    if (newDate <= new Date()) {
      throw new Error('A nova data da agenda deve ser no futuro.');
    }
    this.date = newDate;
    this.startTime = newStartTime;
    this.endTime = newEndTime;
  }
}