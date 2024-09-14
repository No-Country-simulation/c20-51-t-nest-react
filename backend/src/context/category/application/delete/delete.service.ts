import { Injectable } from 'src/utils/injectNest/inject';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { ErrorDeleteCategory } from '../../domain/errors/errorDelete.exception';

@Injectable()
export class DeleteCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async run(id: string): Promise<string> {
    const deletedCategory = await this.categoryRepository.delete(id);
    if (!deletedCategory) {
      throw new ErrorDeleteCategory(id);
    }
    return deletedCategory;
  }
}
