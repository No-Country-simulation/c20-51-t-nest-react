import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Redirect,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { V1_ROUTES } from '../../routes';
import { SuccessPaymentService } from 'src/context/payment/application/sucess/sucess.service';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SucessPaymentController {
  constructor(private readonly paymentService: SuccessPaymentService) {}

  @Get(V1_ROUTES.PAYMENT.SUCCESS)
  @Redirect()
  async sucessPayment(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.paymentService.sucessPayment(id);
    } catch (error) {
      throw new BadRequestException('Error al verificar el pago');
    }
  }
}
