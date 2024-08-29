export interface IUser {
  id?: string;
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
