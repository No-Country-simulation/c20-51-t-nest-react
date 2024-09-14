import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdCategoryService } from 'src/context/category/application/findById/findById.service';
import { NotFoundCategory } from 'src/context/category/domain/errors/NotFound.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindByIdCategoryController {
  constructor(private readonly findByIdService: FindByIdCategoryService) {}

  @Get(V1_ROUTES.CATEGORY.FIND_ONE)
  findById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.findByIdService.run(id);
    } catch (error) {
      if (error instanceof NotFoundCategory) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(
        error.message ? error.message : 'Error al obtener el curso',
      );
    }
  }
}
