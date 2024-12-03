import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.role = userInfo.role;
    this.username = userInfo.username;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}