import {
  IsString,
  IsNotEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';

export class FinishRegistrationDto {
  @IsUUID()
  registrationSessionId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string;
}