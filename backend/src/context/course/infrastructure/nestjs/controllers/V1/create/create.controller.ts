import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  NotAcceptableException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { V1_ROUTES } from '../../route';
import { CreateCourseService } from 'src/context/course/application/create/create.service';
import { CreateCourseDto } from './create.dto';
import { ErrorCreateCourse } from 'src/context/course/domain/errors/ErrorCreateCourse.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class CreateCourseController {
  constructor(private readonly createService: CreateCourseService) {}

  @Post()
  async create(
    @Body() dto: CreateCourseDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) throw new UnauthorizedException('Token no encontrado');
    try {
      const { category, ...course } = dto;
      return await this.createService.run(course, token, category);
    } catch (error) {
      if (error instanceof ErrorCreateCourse) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException('Error al crear el curso');
    }
  }
}
