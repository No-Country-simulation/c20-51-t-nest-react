import { Injectable } from 'src/utils/injectNest/inject';
import { PaymentRepository } from '../../domain/repository/payment.repository';
import { Payment } from '../../domain/entitie/payments.entitie';
import { DbRepository } from '../typeorm/repository/db.repository';
import { RelationsRepository } from './relations.repository';
import { ErrorCreatePayment } from '../../domain/errors/errorCreate.exception';
import { ErrorDeletePayment } from '../../domain/errors/errorDelete.exception';
import { NotFoundPayment } from '../../domain/errors/notFound.exception';

@Injectable()
export class PaymentExternalRepository extends PaymentRepository {
  constructor(
    private readonly dbRepository: DbRepository,
    private readonly relationsRepository: RelationsRepository,
  ) {
    super();
  }

  async create(payment: Payment, token: string): Promise<string> {
    const courses = await this.relationsRepository.relationsCourse(payment);
    const user = await this.relationsRepository.relationsUser(token);
    const newPayment = await this.dbRepository.create({
      course: courses,
      user: user,
    });
    if (!newPayment) {
      throw new ErrorCreatePayment('Error al crear el pago');
    }
    await this.relationsRepository.relationsUserPayment(newPayment, user);
    return 'Payment created successfully';
  }
  async delete(id: string): Promise<string> {
    const deletedPayment = await this.dbRepository.delete(id);
    if (!deletedPayment) {
      throw new ErrorDeletePayment('Error al eliminar el pago');
    }
    return 'Payment deleted successfully';
  }
  async findAll(): Promise<Payment[]> {
    const payments = await this.dbRepository.findAll();
    return payments.map((payment) => Payment.create(payment));
  }
  async findById(id: string): Promise<Payment> {
    const payment = await this.dbRepository.findById(id);
    if (!payment) {
      throw new NotFoundPayment('Payment not found');
    }
    return Payment.create(payment);
  }
}
