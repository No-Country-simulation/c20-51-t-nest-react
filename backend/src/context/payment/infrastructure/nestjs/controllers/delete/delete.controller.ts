import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeletePaymentService } from 'src/context/payment/application/delete/delete.service';
import { ErrorDeletePayment } from 'src/context/payment/domain/errors/errorDelete.exception';
import { V1_ROUTES } from '../routes';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class DeletePaymentController {
  constructor(private readonly deleteService: DeletePaymentService) {}

  @Delete(V1_ROUTES.PAYMENT.DELETE)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.deleteService.run(id);
    } catch (error) {
      if (error instanceof ErrorDeletePayment) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(
        error.message ? error.message : 'Error al eliminar el pago',
      );
    }
  }
}
