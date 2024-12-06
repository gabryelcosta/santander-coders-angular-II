import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../domain/services/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user) {
      const isPasswordValid = await this.comparePassword(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  private async comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(providedPassword, storedPassword);
  }

  async login(user: any) {
    const userWithRole = await this.usersService.findUserRole(user.login);
    const payload = { login: userWithRole.login, sub: userWithRole.userId, role: userWithRole.role, username: userWithRole.username, codUser: userWithRole.codUser };
    try {
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error generating JWT');
    }
  }
}