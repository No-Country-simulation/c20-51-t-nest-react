import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  //   @IsStrongPassword() // TODO: Implementar validacion de password
  password: string;
}
