import { IPayment } from '../../domain/entitie/payment.interface';
import { PaymentRepository } from '../../domain/repository/payment.repository';

export class FindAllPaymentService {
  constructor(private readonly repository: PaymentRepository) {}

  async run(): Promise<IPayment[]> {
    const payments = await this.repository.findAll();
    return payments.map((payment) => payment.toValueObject());
  }
}
