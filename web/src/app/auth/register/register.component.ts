import { Component, signal } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError, tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = { username: '', login: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  register() {
    this.userService.register(this.registerData).pipe(
      tap(() => {
        this.snackBar.open('Registro bem-sucedido! Faça login para continuar.', 'Close', {
          duration: 3000,
        });
        this.registerData = { username: '', login: '', password: '' };
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Registro falhou', error);
        this.snackBar.open('Registro falhou. Tente novamente!', 'Close', {
          duration: 3000,
        });
        return of(null);
      })
    ).subscribe();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}