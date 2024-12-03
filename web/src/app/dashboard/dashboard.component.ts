import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarNavComponent } from '../shared/components/sidebar-nav/sidebar-nav.component';
import { SidebarAppointmentComponent } from '../shared/components/sidebar-appointment/sidebar-appointment.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SidebarNavComponent, SidebarAppointmentComponent, CalendarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
