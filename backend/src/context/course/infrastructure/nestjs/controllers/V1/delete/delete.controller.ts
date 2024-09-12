import {
  BadRequestException,
  Controller,
  Delete,
  NotAcceptableException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { V1_ROUTES } from '../../route';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCourseService } from 'src/context/course/application/delete/delete.service';
import { ErrorDeleteCourse } from 'src/context/course/domain/errors/ErrorDelete.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class DeleteCourseController {
  constructor(private readonly deleteService: DeleteCourseService) {}

  @Delete(V1_ROUTES.COURSE.DELETE)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.deleteService.run(id);
    } catch (error) {
      if (error instanceof ErrorDeleteCourse) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException('Error al eliminar el curso');
    }
  }
}
