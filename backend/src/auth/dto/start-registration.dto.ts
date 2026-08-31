import { IsDateString, IsIn ,IsOptional, IsString, MinLength } from 'class-validator';

export class StartRegistrationDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @IsOptional()
  @IsString()
  @MinLength(3)
  cin?: string;
}