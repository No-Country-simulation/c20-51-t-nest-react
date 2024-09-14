import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from '@nestjs/common';
import { V1_ROUTES } from '../../route';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCourseService } from 'src/context/course/application/update/update.service';
import { UpdateCourseDto } from './update.dto';
import { ErrorUpdateCourse } from 'src/context/course/domain/errors/ErrorUpdateCourse.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class UpdateCourseController {
  constructor(private readonly updateService: UpdateCourseService) {}

  @Put(V1_ROUTES.COURSE.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    try {
      return await this.updateService.run(id, dto);
    } catch (error) {
      if (error instanceof ErrorUpdateCourse) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error al actualizar el curso');
    }
  }
}
