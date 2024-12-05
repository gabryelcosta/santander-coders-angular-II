import { Component, OnInit, signal } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { RoleService } from '../../shared/services/role.service';
import { SpecialtyService } from '../../shared/services/specialty.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Role } from '../../shared/models/role.model';
import { Specialty } from '../../shared/models/specialty.model';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatButtonModule, HeaderComponent],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  registerData = { username: '', login: '', password: '', roleId: null as number | null, specialtyId: null as number | null };
  roles: Role[] = [];
  specialties: Specialty[] = [];

  constructor(
    private adminService: AdminService,
    private roleService: RoleService,
    private specialtyService: SpecialtyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadSpecialties();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().pipe(
      tap((roles: any[]) => {
        this.roles = roles.map(role => ({ id: role._id, name: role._name }));
      }),
      catchError(error => {
        console.error('Erro ao carregar as funções', error);
        this.snackBar.open('Erro ao carregar as funções. Tente novamente!', 'Close', {
          duration: 3000,
        });
        return of([]);
      })
    ).subscribe();
  }

  loadSpecialties(): void {
    this.specialtyService.getAllSpecialties().pipe(
      tap((specialties: Specialty[]) => {
        this.specialties = specialties;
      }),
      catchError(error => {
        console.error('Erro ao carregar as especialidades', error);
        this.snackBar.open('Erro ao carregar as especialidades. Tente novamente!', 'Close', {
          duration: 3000,
        });
        return of([]);
      })
    ).subscribe();
  }

  register() {
    const { username, login, password, roleId, specialtyId } = this.registerData;
    if (roleId !== null) {
      this.adminService.createAdmin({ username, login, password, roleId, specialtyId }).pipe(
        tap(() => {
          this.snackBar.open('Registro de administrador bem-sucedido! Faça login para continuar.', 'Close', {
            duration: 3000,
          });
          this.registerData = { username: '', login: '', password: '', roleId: null, specialtyId: null };
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          const errorMessage = error.error?.message?.message || 'Registro de administrador falhou. Tente novamente!';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
          return throwError(error);
        })
      ).subscribe();
    } else {
      this.snackBar.open('Por favor, selecione uma função.', 'Close', {
        duration: 3000,
      });
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  isDoctorOrAdmin(): boolean {
    const role = this.roles.find(r => r.id === this.registerData.roleId);
    return role ? role.name.toLowerCase() === 'medico' || role.name.toLowerCase() === 'administrador' : false;
  }
}