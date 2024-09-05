import { IUserUpdate } from './userupdate.interface';

export class UserUpdate {
  constructor(private readonly attributes: IUserUpdate) {}

  static create(attributes: IUserUpdate) {
    return new UserUpdate(attributes);
  }

  toValueObject(): IUserUpdate {
    return {
      name: this.attributes.name,
      email: this.attributes.email,
      password: this.attributes.password,
      image_url: this.attributes.image_url,
      phone: this.attributes.phone,
      country: this.attributes.country,
    };
  }
  get name(): string {
    return this.attributes.name;
  }
  get email(): string {
    return this.attributes.email;
  }
  get password(): string {
    return this.attributes.password;
  }
  get image_url(): string {
    return this.attributes.image_url;
  }
  get phone(): number {
    return this.attributes.phone;
  }
  get country(): string {
    return this.attributes.country;
  }
  get birthdate(): string {
    return this.attributes.birthdate;
  }
}
