import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthCustomStrategy } from './strategies/auth-custom.strategy';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from "./controllers/authentication.controller";
import { userProvider } from "../user/providers/user.provider";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 60 * 60 * 24,
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthCustomStrategy, ...userProvider],
  exports: [PassportModule, AuthenticationService],
})
export class AuthenticationModule {}
