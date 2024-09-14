import {
  BadRequestException,
  Controller,
  Delete,
  NotAcceptableException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { V1_ROUTES } from '../../routes';
import { DeleteCategoryService } from 'src/context/category/application/delete/delete.service';
import { ErrorDeleteCategory } from 'src/context/category/domain/errors/errorDelete.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class DeleteCategoryController {
  constructor(private readonly deleteService: DeleteCategoryService) {}

  @Delete(V1_ROUTES.CATEGORY.DELETE)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.deleteService.run(id);
    } catch (error) {
      if (error instanceof ErrorDeleteCategory) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(
        error.message ? error.message : 'Error al eliminar el curso',
      );
    }
  }
}
