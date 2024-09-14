import { ApiTags } from '@nestjs/swagger';
import { FindAllCategoryService } from 'src/context/category/application/findAll/findAll.service';
import { V1_ROUTES } from '../../routes';
import { BadRequestException, Controller, Get } from '@nestjs/common';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindAllCategoryController {
  constructor(private readonly findAllService: FindAllCategoryService) {}

  @Get()
  findAll() {
    try {
      return this.findAllService.run();
    } catch (error) {
      throw new BadRequestException('Error al obtener todos los cursos');
    }
  }
}
