import { IAuthor, ICategory } from '../new/course.interface';

export interface ICourseUpdate {
  name?: string;
  description?: string;
  price?: number;
  author?: IAuthor;
  category?: ICategory;
  reviews?: number; // TODO: Luego cambiarlo por la interface de la clase de reviews
  duration?: string;
  level?: string;
  image_url?: string;
}
