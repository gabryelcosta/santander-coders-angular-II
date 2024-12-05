import { Component, signal } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError, tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { login: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login() {
    this.authService.login(this.loginData).pipe(
      tap(() => this.router.navigate(['/dashboard'])),
      catchError(error => {
        let errorMessage = 'Login ou Password incorretos. Tente novamente!';
        if (error.status !== 401 && error.status !== 403) {
          errorMessage = error.error?.message || 'Erro no servidor. Tente novamente mais tarde!';
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });
        return throwError(error);
      })
    ).subscribe();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}