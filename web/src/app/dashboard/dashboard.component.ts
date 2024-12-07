import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, CalendarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
