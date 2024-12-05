import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SidebarAppointmentComponent } from '../../shared/components/sidebar-appointment/sidebar-appointment.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  daysInMonth: { day: number | null, dayOfWeek: string | null }[] = [];
  currentMonth: string = '';
  currentYear: number = 0;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long' });
    this.currentYear = now.getFullYear();
    const month = now.getMonth();

    const firstDayOfMonth = new Date(this.currentYear, month, 1).getDay();
    const daysInMonth = new Date(this.currentYear, month + 1, 0).getDate();

    // Dias vazios antes do primeiro dia do mês
    this.daysInMonth = Array.from({ length: firstDayOfMonth }, () => ({
      day: null,
      dayOfWeek: null,
    }));

    // Preencher os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentYear, month, i);
      const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
      this.daysInMonth.push({ day: i, dayOfWeek });
    }
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