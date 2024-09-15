import { PaymentRepository } from '../../domain/repository/payment.repository';

export class CancelPaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async cancelPayment(id: string): Promise<{ url: string }> {
    const url = await this.paymentRepository.updateStatusPayment(
      id,
      'CANCELLED',
    );
    return {
      url: `${url}?id=${id}`,
    };
  }
}
