import { ErrorDeletePayment } from '../../domain/errors/errorDelete.exception';
import { PaymentRepository } from '../../domain/repository/payment.repository';

export class DeletePaymentService {
  constructor(private readonly repository: PaymentRepository) {}

  async run(id: string): Promise<string> {
    const deletedPayment = await this.repository.delete(id);
    if (!deletedPayment) {
      throw new ErrorDeletePayment(id);
    }
    return deletedPayment;
  }
}
