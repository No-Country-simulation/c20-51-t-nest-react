import { Injectable } from 'src/utils/injectNest/inject';
import { stripe } from 'src/config/stripe.config';
import { Payment } from '../typeorm/entitie/payment.entitie';
import { LineItems } from 'src/utils/interfaces/lineItems.interface';
import { envs } from 'src/config/envs';
import { DbRepository } from '../typeorm/repository/db.repository';
import { PaymentStatus } from 'src/utils/enum/payments.enum';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class StripeRepository {
  constructor(private readonly dbRepository: DbRepository) {}

  async createPayment(payment: Payment): Promise<string> {
    const line_items = this.lineItems(payment);
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${envs.INTERNAL_API_SUCESS}/${payment.id}`,
      cancel_url: `${envs.INTERNAL_API_CANCEL}/${payment.id}`,
    });
    if (!session.url) {
      throw new BadRequestException('Error al crear el pago');
    }
    return session.url;
  }

  async sucessPayment(id: string): Promise<string> {
    const paymentPaid = await this.dbRepository.updateStatusPayment(
      id,
      PaymentStatus.PAID,
    );
    if (paymentPaid) return envs.SUCESS_URL;
  }
  async cancelPayment(id: string): Promise<string> {
    const paymentCancelled = await this.dbRepository.updateStatusPayment(
      id,
      PaymentStatus.CANCELLED,
    );
    if (paymentCancelled) return envs.CANCEL_URL;
  }

  private lineItems(payment: Payment): LineItems[] {
    return payment.course.map((course) => ({
      price_data: {
        product_data: {
          name: course.name,
          description: this.truncateDescription(course.description, 5),
          images: [course.image_url],
        },
        currency: 'usd',
        unit_amount: Math.round(course.price * 100),
      },
      quantity: 1,
    }));
  }

  private truncateDescription(description: string, wordLimit: number): string {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
