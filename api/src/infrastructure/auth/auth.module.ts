import { Module } from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { LocalStrategy } from '../../application/auth/local.strategy';
import { JwtStrategy } from '../../application/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DomainModule } from '../../domain/domain.module';
import { jwtConstants } from '../../application/auth/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    DomainModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}