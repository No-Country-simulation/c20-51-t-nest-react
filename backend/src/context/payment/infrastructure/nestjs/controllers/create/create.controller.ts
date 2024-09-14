import {
  Controller,
  Post,
  Body,
  BadRequestException,
  NotAcceptableException,
  Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentService } from 'src/context/payment/application/create/create.service';
import { ErrorCreatePayment } from 'src/context/payment/domain/errors/errorCreate.exception';
import { V1_ROUTES } from '../routes';
import { CreatePaymentDto } from './create.dto';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class CreatePaymentController {
  constructor(private readonly createService: CreatePaymentService) {}

  @Post()
  async create(
    @Body() dto: CreatePaymentDto,
    @Headers('authorization') token: string,
  ) {
    try {
      return await this.createService.run(dto, token);
    } catch (error) {
      if (error instanceof ErrorCreatePayment) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(
        error.message ? error.message : 'Error al crear el pago',
      );
    }
  }
}
