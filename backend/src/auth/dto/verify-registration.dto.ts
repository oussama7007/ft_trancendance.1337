import { IsString, IsUUID, Length } from 'class-validator';

export class VerifyRegistrationDto {
  @IsUUID()
  registrationSessionId: string;

  @IsString()
  @Length(4, 4)
  code: string;
}