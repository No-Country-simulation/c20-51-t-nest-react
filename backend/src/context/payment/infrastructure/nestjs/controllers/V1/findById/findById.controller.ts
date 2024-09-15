import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdPaymentService } from 'src/context/payment/application/findById/findById.service';
import { NotFoundPayment } from 'src/context/payment/domain/errors/notFound.exception';
import { V1_ROUTES } from '../../routes';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindByIdPaymentController {
  constructor(private readonly findByIdService: FindByIdPaymentService) {}

  @Get(V1_ROUTES.PAYMENT.FIND_ONE)
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.findByIdService.run(id);
    } catch (error) {
      if (error instanceof NotFoundPayment) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(
        error.message ? error.message : 'Error al obtener el pago',
      );
    }
  }
}
