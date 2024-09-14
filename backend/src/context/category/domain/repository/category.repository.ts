import { Category } from '../entities/category.entitie';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<string>;
  abstract delete(id: string): Promise<string>;
  abstract findAll(): Promise<Category[]>;
  abstract findById(id: string): Promise<Category>;
  abstract update(category: Category, id: string): Promise<string>;
}
