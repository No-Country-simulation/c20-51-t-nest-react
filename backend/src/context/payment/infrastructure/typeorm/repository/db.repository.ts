import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from 'src/utils/injectNest/inject';
import { Payment as PaymentDB } from '../entitie/payment.entitie';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentStatus } from 'src/utils/enum/payments.enum';

@Injectable()
export class DbRepository {
  constructor(
    @InjectRepository(PaymentDB)
    private readonly paymentRepository: Repository<PaymentDB>,
  ) {}

  async findAll(): Promise<PaymentDB[]> {
    const payments = await this.paymentRepository.find();
    return payments;
  }

  async findById(id: string): Promise<PaymentDB> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async create(payment: Partial<PaymentDB>): Promise<PaymentDB> {
    const newPayment = await this.paymentRepository.save(payment);
    if (!newPayment) {
      throw new BadRequestException('Error al crear el pago');
    }
    return newPayment;
  }

  async delete(id: string): Promise<string> {
    const deletedPayment = await this.paymentRepository.delete(id);
    if (deletedPayment.affected === 0) {
      throw new BadRequestException('Error al eliminar el pago');
    }
    return 'Payment deleted successfully';
  }

  async updateStatusPayment(
    id: string,
    status: PaymentStatus,
  ): Promise<string> {
    const paymentUpdated = await this.paymentRepository.update(id, {
      status: status,
    });
    if (!paymentUpdated) {
      throw new BadRequestException('Error al actualizar el pago');
    }
    return 'Payment updated successfully';
  }
}
