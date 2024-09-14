import { Injectable } from 'src/utils/injectNest/inject';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { ErrorUpdateCategory } from '../../domain/errors/errorUpdate.exception';
import { ICategory } from '../../domain/entities/category.interface';
import { Category } from '../../domain/entities/category.entitie';

@Injectable()
export class UpdateCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async run(category: ICategory, id: string): Promise<string> {
    const categoryToUpdate = Category.create(category);
    const updatedCategory = await this.categoryRepository.update(
      categoryToUpdate,
      id,
    );
    if (!updatedCategory) {
      throw new ErrorUpdateCategory(id);
    }
    return updatedCategory;
  }
}
