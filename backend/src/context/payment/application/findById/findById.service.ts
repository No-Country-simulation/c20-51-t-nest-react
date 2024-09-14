import { IPayment } from '../../domain/entitie/payment.interface';
import { NotFoundPayment } from '../../domain/errors/notFound.exception';
import { PaymentRepository } from '../../domain/repository/payment.repository';

export class FindByIdPaymentService {
  constructor(private readonly repository: PaymentRepository) {}
  async run(id: string): Promise<IPayment> {
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new NotFoundPayment(id);
    }
    return payment.toValueObject();
  }
}
