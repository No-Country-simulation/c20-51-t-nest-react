import { Injectable } from 'src/utils/injectNest/inject';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { ICategory } from '../../domain/entities/category.interface';

@Injectable()
export class FindAllCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async run(): Promise<ICategory[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map((category) => category.toValueObject());
  }
}
