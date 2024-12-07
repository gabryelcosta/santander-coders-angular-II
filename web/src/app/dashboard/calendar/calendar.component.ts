import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SidebarAppointmentComponent } from '../../shared/components/sidebar-appointment/sidebar-appointment.component';
import { AppointmentService } from '../../shared/services/appointment.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  daysInMonth: { day: number | null, dayOfWeek: string | null, appointments: any[], isPast: boolean, isWeekend: boolean }[] = [];
  currentMonth: string = '';
  currentYear: number = 0;
  role: string = '';
  userId: string = '';

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.userId = this.authService.getLoggedUserCodUser();
    this.generateCalendar();
    this.loadAppointments();
  }

  generateCalendar(): void {
    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long' });
    this.currentYear = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDayOfMonth = new Date(this.currentYear, month, 1).getDay();
    const daysInMonth = new Date(this.currentYear, month + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: firstDayOfMonth }, () => ({
      day: null,
      dayOfWeek: null,
      appointments: [],
      isPast: false,
      isWeekend: false
    }));

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentYear, month, i);
      const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
      const isPast = this.isPastDate(date, now);
      const isWeekend = this.isWeekend(dayOfWeek);
      this.daysInMonth.push({ day: i, dayOfWeek, appointments: [], isPast, isWeekend });
    }
  }

  isPastDate(date: Date, now: Date): boolean {
    return date < new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.filterAppointments(appointments);
    });
  }

  filterAppointments(appointments: any[]): void {
    appointments.forEach(appointment => {
      const appointmentDate = new Date(appointment.appointmentTime);
      const day = appointmentDate.getDate();
      const month = appointmentDate.toLocaleString('default', { month: 'long' });
      const year = appointmentDate.getFullYear();

      if (month === this.currentMonth && year === this.currentYear) {
        const dayIndex = this.daysInMonth.findIndex(d => d.day === day);
        if (dayIndex !== -1) {
          if (this.role === 'admin' ||
              (this.role === 'doctor' && appointment.doctorId === this.userId) ||
              (this.role === 'patient' && appointment.patientId === this.userId)) {
            appointment.description = `${appointment.patientId} - ${appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            this.daysInMonth[dayIndex].appointments.push(appointment);
          }
        }
      }
    });
  }

  openSidebar(day: number): void {
    this.dialog.open(SidebarAppointmentComponent, {
      data: { day, month: this.currentMonth, year: this.currentYear }
    });
  }

  isWeekend(dayOfWeek: string | null): boolean {
    return dayOfWeek === 'sábado' || dayOfWeek === 'domingo';
  }
}