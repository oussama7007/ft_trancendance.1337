import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StartRegistrationDto } from './dto/start-registration.dto';
import { RegisterContactDto } from './dto/register-contact.dto';
import { VerifyRegistrationDto } from './dto/verify-registration.dto';
import { FinishRegistrationDto } from './dto/finish-registration.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/start')
  startRegistration(@Body() dto: StartRegistrationDto) {
    return this.authService.startRegistration(dto);
  }

  @Post('register/contact')
  registerContact(@Body() dto: RegisterContactDto) {
    return this.authService.registerContact(dto);
  }

  @Post('register/verify')
  verifyRegistration(@Body() dto: VerifyRegistrationDto) {
    return this.authService.verifyRegistration(dto);
  }
  @Post('register/finish')
  finishRegistration(@Body() dto: FinishRegistrationDto) {
    return this.authService.finishRegistration(dto);
  }
}