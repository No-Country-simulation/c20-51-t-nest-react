import { ICategory } from './category.interface';

export class Category {
  constructor(private readonly attributes: ICategory) {}

  static create(attributes: ICategory) {
    return new Category(attributes);
  }

  toValueObject(): ICategory {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      createdAt: this.attributes.createdAt,
      updatedAt: this.attributes.updatedAt,
    };
  }

  get id(): string {
    return this.attributes.id;
  }

  get name(): string {
    return this.attributes.name;
  }
}
