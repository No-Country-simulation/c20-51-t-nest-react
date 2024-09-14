import { ICourse } from './course.interface';

export class Course {
  constructor(private readonly attributes: ICourse) {}

  static create(attributes: ICourse) {
    return new Course(attributes);
  }

  toValueObject(): ICourse {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      description: this.attributes.description,
      price: this.attributes.price,
      author: this.attributes.author,
      category: this.attributes.category,
      reviews: this.attributes.reviews,
      duration: this.attributes.duration,
      level: this.attributes.level,
      image_url: this.attributes.image_url,
      createdAt: this.attributes.createdAt,
      updatedAt: this.attributes.updatedAt,
    };
  }

  get id(): string {
    return this.attributes.id;
  }
}
