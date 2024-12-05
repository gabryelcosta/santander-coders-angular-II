import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarNavComponent } from '../shared/components/sidebar-nav/sidebar-nav.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SidebarNavComponent, CalendarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
