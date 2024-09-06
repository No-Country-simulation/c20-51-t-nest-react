export interface ICourse {
  id?: string;
  name: string;
  description: string;
  price: number;
  author: string; // TODO: Luego cambiarlo por la interface de la clase de autor
  category: string; // TODO: Luego cambiarlo por la interface de la categoría
  reviews: number; // TODO: Luego cambiarlo por la interface de la clase de reviews
  duration: string;
  level: string;
  image_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
