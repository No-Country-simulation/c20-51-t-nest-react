import { PaymentRepository } from '../../domain/repository/payment.repository';

export class SuccessPaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async sucessPayment(id: string): Promise<{ url: string }> {
    const url = await this.paymentRepository.updateStatusPayment(id, 'PAID');
    return {
      url: `${url}?id=${id}`,
    };
  }
}
