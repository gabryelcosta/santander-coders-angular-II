import { Controller, Post, Body, UseGuards, Logger, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { LocalAuthGuard } from '../../application/auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    try {
      const result = await this.authService.login(body);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Login failed');
    }
  }
}