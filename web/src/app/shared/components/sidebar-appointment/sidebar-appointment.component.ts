import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyService } from '../../services/specialty.service';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar-appointment.component.html',
  styleUrls: ['./sidebar-appointment.component.css']
})
export class SidebarAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  specialties: { id: number, name: string }[] = [];
  users: { id: number, name: string }[] = [];
  noDoctorsMessage: string | null = null;
  isSpecialtySelected: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { day: number, month: string, year: number },
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.appointmentForm = this.fb.group({
      specialty: ['', Validators.required],
      user: [{ value: '', disabled: true }, Validators.required],
      date: [
        { value: `${data.year}-${this.padZero(this.convertMonthToNumber(data.month))}-${this.padZero(data.day)}`, disabled: true },
        Validators.required
      ],
      startTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.specialtyService.getAllSpecialties().subscribe((specialties: { id: number, name: string }[]) => {
      this.specialties = specialties;
    });
  }

  onSpecialtyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const specialtyId = Number(selectElement.value);
    this.isSpecialtySelected = !!specialtyId;

    this.appointmentForm.get('user')?.disable();
    this.specialtyService.getUsersBySpecialty(specialtyId).subscribe(
      (users: { id: number, username: string }[]) => {
        if (users.length === 0) {
          this.users = [];
          this.noDoctorsMessage = 'Não há médicos associados a esta especialidade.';
        } else {
          this.users = users.map(user => ({ id: user.id, name: user.username }));
          this.noDoctorsMessage = null;
          this.appointmentForm.get('user')?.enable();
        }
      },
      error => {
        this.users = [];
        this.noDoctorsMessage = 'Erro ao buscar médicos. Tente novamente mais tarde.';
      }
    );
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.getRawValue();
      const CodUser = this.authService.getLoggedUserCodUser();

      appointmentData.patientId = CodUser;

      const scheduleData = {
        doctorId: Number(appointmentData.user),
        specialtyId: Number(appointmentData.specialty),
        date: appointmentData.date,
        startTime: this.formatTime(appointmentData.startTime),
        endTime: this.calculateEndTime(appointmentData.startTime)
      };

      this.appointmentService.createScheduleAndAppointment(scheduleData, appointmentData).subscribe(
        response => {
          this.snackBar.open('Agendamento criado com sucesso!', 'Fechar', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Erro ao criar agendamento. Por favor, tente novamente.', 'Fechar');
        }
      );
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar');
    }
  }

  calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    return endDate.toTimeString().split(' ')[0];
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    return `${this.padZero(hours)}:${this.padZero(minutes)}:00`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  convertMonthToNumber(month: string): number {
    const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const monthIndex = monthNames.indexOf(month.toLowerCase());
    return monthIndex === -1 ? 0 : monthIndex + 1;
  }
}