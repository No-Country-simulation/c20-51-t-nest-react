import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  BadRequestException,
  Redirect,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CancelPaymentService } from 'src/context/payment/application/cancel/cancel.service';
import { V1_ROUTES } from '../../routes';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class CancelPaymentController {
  constructor(private readonly cancelPaymentService: CancelPaymentService) {}

  @Get(V1_ROUTES.PAYMENT.CANCEL)
  @Redirect()
  async cancelPayment(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.cancelPaymentService.cancelPayment(id);
    } catch (error) {
      throw new BadRequestException('Error al cancelar el pago');
    }
  }
}
