import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsNumber()
  phone: number;
  @IsString()
  birthdate: string;
  @IsString()
  country: string;
}
