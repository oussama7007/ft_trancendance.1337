import { IsEmail, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';



export class RegisterContactDto {
  @IsUUID()
  registrationSessionId: string;

  @IsIn(['email', 'phone'])
  type: 'email' | 'phone';

  gender: 'male' | 'female';

  @IsString()
  @IsNotEmpty()
  value: string;
}