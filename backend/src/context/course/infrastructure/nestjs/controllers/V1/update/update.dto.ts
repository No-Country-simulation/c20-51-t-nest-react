import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from '../create/create.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
