import { Category } from '../../domain/entities/category.entitie';
import { CategoryRepository } from '../../domain/repository/category.repository';

export class CategoryExternalRepository extends CategoryRepository {
  constructor() {
    super();
  }
  async create(category: Category): Promise<string> {
    return await 'json';
  }
  async delete(id: string): Promise<string> {
    return await 'json';
  }
  async findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  async update(category: Category, id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
