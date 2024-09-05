import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  //   IsStrongPassword,
} from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  //   @IsStrongPassword() // TODO: implementar validacion de password
  password?: string;
  @IsOptional()
  @IsString()
  image_url?: string;
  @IsOptional()
  @IsString()
  birthdate?: string;
  @IsOptional()
  @IsNumber()
  phone?: number;
  @IsOptional()
  country?: string;
}
