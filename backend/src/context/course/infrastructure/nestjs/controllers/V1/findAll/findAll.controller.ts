import { BadRequestException, Controller, Get } from '@nestjs/common';
import { V1_ROUTES } from '../../route';
import { ApiTags } from '@nestjs/swagger';
import { FindAllCourseService } from 'src/context/course/application/findAll/findAll.service';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindAllCourseController {
  constructor(private readonly findAllService: FindAllCourseService) {}

  @Get()
  async findAll() {
    try {
      return await this.findAllService.run();
    } catch (error) {
      throw new BadRequestException('Error al obtener todos los cursos');
    }
  }
}
