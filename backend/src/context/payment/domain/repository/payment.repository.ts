import { Payment } from '../entitie/payments.entitie';

export abstract class PaymentRepository {
  abstract findAll(): Promise<Payment[]>;
  abstract findById(id: string): Promise<Payment>;
  abstract create(payment: Payment, token: string): Promise<string>;
  abstract delete(id: string): Promise<string>;
  abstract updateStatusPayment(id: string, status: string): Promise<string>;
}
