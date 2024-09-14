import { ICourse, IPayment } from './payment.interface';

export class Payment {
  constructor(private readonly attributes: IPayment) {}

  static create(attributes: IPayment) {
    return new Payment(attributes);
  }

  toValueObject(): IPayment {
    return {
      id: this.attributes.id,
      user: this.attributes.user,
      course: this.attributes.course,
      status: this.attributes.status,
      createdAt: this.attributes.createdAt,
      updatedAt: this.attributes.updatedAt,
    };
  }

  get id(): string {
    return this.attributes.id;
  }
  set status(status: string) {
    this.attributes.status = status;
  }

  get course(): ICourse[] {
    return this.attributes.course;
  }
}
