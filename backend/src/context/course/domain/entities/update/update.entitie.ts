import { ICourseUpdate } from './updateCourse.interface';

export class UpdateCourse {
  constructor(private readonly attributes: ICourseUpdate) {}

  static create(attributes: ICourseUpdate) {
    return new UpdateCourse(attributes);
  }

  toValueObject(): ICourseUpdate {
    return {
      name: this.attributes.name,
      description: this.attributes.description,
      price: this.attributes.price,
      author: this.attributes.author,
      category: this.attributes.category,
      reviews: this.attributes.reviews,
      duration: this.attributes.duration,
      level: this.attributes.level,
      image_url: this.attributes.image_url,
    };
  }

  get name(): string {
    return this.attributes.name;
  }
}
