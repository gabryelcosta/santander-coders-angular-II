import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpecialtyService } from '../../services/specialty.service';

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
    private specialtyService: SpecialtyService
  ) {
    this.appointmentForm = this.fb.group({
      specialty: ['', Validators.required],
      user: [{ value: '', disabled: true }, Validators.required],
      date: [{ value: `${data.day}/${data.month}/${data.year}`, disabled: true }, Validators.required],
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
    this.isSpecialtySelected = true;
    this.appointmentForm.get('user')?.enable();
    this.specialtyService.getUsersBySpecialty(specialtyId).subscribe((users: { id: number, username: string }[]) => {
      if (users.length === 0) {
        this.users = [];
        this.noDoctorsMessage = 'Não há médicos associados a esta especialidade.';
        this.appointmentForm.get('user')?.disable();
      } else {
        this.users = users.map(user => ({ id: user.id, name: user.username }));
        this.noDoctorsMessage = null;
        this.appointmentForm.get('user')?.enable();
      }
    }, error => {
      this.users = [];
      this.noDoctorsMessage = 'Erro ao buscar médicos. Tente novamente mais tarde.';
      this.appointmentForm.get('user')?.disable();
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.getRawValue();
      console.log('Dados da marcação:', appointmentData);
      // Lógica para enviar os dados para o backend
    }
  }
}