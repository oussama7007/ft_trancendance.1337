import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';




import { User } from '../users/user.entity';
import { RegistrationSession } from './registration-session.entity';
import { VerificationChallenge } from './verification-challenge.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserContact } from 'src/users/user-contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegistrationSession,
      VerificationChallenge,
      User,
      UserContact,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

