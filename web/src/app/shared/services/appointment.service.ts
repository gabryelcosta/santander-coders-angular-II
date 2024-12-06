import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AppointmentData {
  patientId: number;
  doctorId: number;
  scheduleId: number;
  specialtyId: number;
  appointmentTime: string;
}

interface ScheduleData {
  doctorId: number;
  specialtyId: number;
  date: string;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`;
  private scheduleApiUrl = `${environment.apiUrl}/schedules`;

  constructor(private http: HttpClient) {}

  createSchedule(scheduleData: ScheduleData): Observable<any> {
    return this.http.post<any>(this.scheduleApiUrl, scheduleData);
  }

  createAppointment(appointmentData: AppointmentData): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointmentData);
  }

  createScheduleAndAppointment(scheduleData: ScheduleData, appointmentData: AppointmentData): Observable<any> {
    return new Observable(observer => {
      this.createSchedule(scheduleData).subscribe(
        scheduleResponse => {
          if (!scheduleResponse.id) {
            observer.error('Schedule creation failed: No ID returned');
            return;
          }

          appointmentData.scheduleId = scheduleResponse.id;
          appointmentData.appointmentTime = `${scheduleResponse.date}T${scheduleResponse.startTime}`;
          appointmentData.doctorId = scheduleResponse.doctorId;
          appointmentData.specialtyId = scheduleResponse.specialtyId;
          this.createAppointment(appointmentData).subscribe(
            appointmentResponse => {
              observer.next(appointmentResponse);
              observer.complete();
            },
            appointmentError => {
              observer.error(appointmentError);
            }
          );
        },
        scheduleError => {
          observer.error(scheduleError);
        }
      );
    });
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateAppointment(id: number, appointmentData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, appointmentData);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}