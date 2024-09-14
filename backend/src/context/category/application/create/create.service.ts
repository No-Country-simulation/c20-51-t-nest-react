import { Injectable } from 'src/utils/injectNest/inject';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { ICategory } from '../../domain/entities/category.interface';
import { Category } from '../../domain/entities/category.entitie';
import { ErrorCreateCategory } from '../../domain/errors/errorCreate.exception';

@Injectable()
export class CreateCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async run(category: ICategory): Promise<string> {
    const newCategory = Category.create(category);
    const createdCategory = await this.categoryRepository.create(newCategory);
    if (!createdCategory) {
      throw new ErrorCreateCategory('Error al crear el curso');
    }
    return createdCategory;
  }
}
