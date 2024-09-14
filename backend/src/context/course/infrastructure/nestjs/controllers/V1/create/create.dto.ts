import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  category: string;
  @IsNumber()
  price: number;
  @IsString()
  duration: string;
  @IsString()
  level: string;
  @IsString()
  image_url: string;
}
