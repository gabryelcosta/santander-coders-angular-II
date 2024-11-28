import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { LocalAuthGuard } from '../../application/auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}