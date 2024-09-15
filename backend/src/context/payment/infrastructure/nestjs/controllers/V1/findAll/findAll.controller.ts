import { Controller, Get, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllPaymentService } from 'src/context/payment/application/findAll/findAll.service';
import { V1_ROUTES } from '../../routes';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindAllPaymentController {
  constructor(private readonly findAllService: FindAllPaymentService) {}

  @Get()
  async findAll() {
    try {
      return await this.findAllService.run();
    } catch (error) {
      throw new BadRequestException('Error al obtener todos los pagos');
    }
  }
}
