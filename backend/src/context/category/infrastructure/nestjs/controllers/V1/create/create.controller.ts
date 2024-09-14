import {
  BadRequestException,
  Body,
  Controller,
  NotAcceptableException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { V1_ROUTES } from '../../routes';
import { CreateCategoryService } from 'src/context/category/application/create/create.service';
import { CreateCategoryDto } from './create.dto';
import { ErrorCreateCategory } from 'src/context/category/domain/errors/errorCreate.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class CreateCategoryController {
  constructor(private readonly createService: CreateCategoryService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    try {
      return await this.createService.run(dto);
    } catch (error) {
      if (error instanceof ErrorCreateCategory) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(
        error.message ? error.message : 'Error al crear el curso',
      );
    }
  }
}
