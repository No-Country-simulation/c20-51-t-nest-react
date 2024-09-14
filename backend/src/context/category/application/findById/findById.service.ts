import { Injectable } from 'src/utils/injectNest/inject';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { ICategory } from '../../domain/entities/category.interface';
import { NotFoundCategory } from '../../domain/errors/NotFound.exception';

@Injectable()
export class FindByIdCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async run(id: string): Promise<ICategory> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundCategory(id);
    }
    return category.toValueObject();
  }
}
