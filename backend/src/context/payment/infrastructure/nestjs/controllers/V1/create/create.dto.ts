import { IsArray } from 'class-validator';
import { ICourse } from 'src/context/payment/domain/entitie/payment.interface';

export class CreatePaymentDto {
  @IsArray()
  course: ICourse[];
}
