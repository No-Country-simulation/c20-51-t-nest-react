import { IPayment } from '../../domain/entitie/payment.interface';
import { Payment } from '../../domain/entitie/payments.entitie';
import { ErrorCreatePayment } from '../../domain/errors/errorCreate.exception';
import { PaymentRepository } from '../../domain/repository/payment.repository';

export class CreatePaymentService {
  constructor(private readonly repository: PaymentRepository) {}

  async run(payment: IPayment, token: string): Promise<string> {
    const newPayment = Payment.create(payment);
    const createdPayment = await this.repository.create(newPayment, token);
    if (!createdPayment) {
      throw new ErrorCreatePayment('Error al crear el pago');
    }
    return createdPayment;
  }
}
