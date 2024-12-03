import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAppointmentComponent } from './sidebar-appointment.component';

describe('SidebarAppointmentComponent', () => {
  let component: SidebarAppointmentComponent;
  let fixture: ComponentFixture<SidebarAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
