import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SidebarNavComponent } from '../shared/components/sidebar-nav/sidebar-nav.component';
import { SidebarAppointmentComponent } from '../shared/components/sidebar-appointment/sidebar-appointment.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from '../shared/components/footer/footer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    SidebarNavComponent,
    SidebarAppointmentComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DashboardModule { }