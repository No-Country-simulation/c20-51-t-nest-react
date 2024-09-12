import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FindByIdCourseService } from 'src/context/course/application/findById/findById.service';
import { V1_ROUTES } from '../../route';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundCourse } from 'src/context/course/domain/errors/NotFoundCourse.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindByIdCourseController {
  constructor(private readonly findByIdService: FindByIdCourseService) {}

  @Get(V1_ROUTES.COURSE.FIND_ONE)
  async findById(@Param('id') id: string) {
    try {
      return await this.findByIdService.run(id);
    } catch (error) {
      if (error instanceof NotFoundCourse) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error al obtener el curso');
    }
  }
}
