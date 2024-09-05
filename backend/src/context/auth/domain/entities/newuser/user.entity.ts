import { IUser } from './user.interface';

export class User {
  constructor(private readonly attributes: IUser) {}

  static create(attributes: IUser) {
    return new User(attributes);
  }

  toValueObject(): IUser {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      image_url: this.attributes.image_url,
      phone: this.attributes.phone,
      country: this.attributes.country,
    };
  }

  get id(): string {
    return this.attributes.id;
  }

  get email(): string {
    return this.attributes.email;
  }
}
