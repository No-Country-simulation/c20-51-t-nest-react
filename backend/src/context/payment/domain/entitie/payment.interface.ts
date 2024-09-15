export interface IPayment {
  id?: string;
  user?: IAuthor;
  course: ICourse[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse {
  id?: string;
  name: string;
  description: string;
  price: number;
  author?: IAuthor;
  category?: ICategory;
  reviews?: number; // TODO: Luego cambiarlo por la interface de la clase de reviews
  duration: string;
  level: string;
  image_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  image_url?: string;
  phone?: number;
  birthdate?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
