import { Category } from '../../domain/entities/category.entitie';
import { ErrorCreateCategory } from '../../domain/errors/errorCreate.exception';
import { ErrorDeleteCategory } from '../../domain/errors/errorDelete.exception';
import { NotFoundCategory } from '../../domain/errors/NotFound.exception';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { MethodBasicDB } from '../typeorm/repository/basicMetohd';

export class CategoryExternalRepository extends CategoryRepository {
  constructor(private readonly dbRepository: MethodBasicDB) {
    super();
  }
  async create(category: Category): Promise<string> {
    const newCategory = await this.dbRepository.create(category);
    if (!newCategory) {
      throw new ErrorCreateCategory('Error al crear el curso');
    }
    return 'Categoria creada correctamente';
  }
  async delete(id: string): Promise<string> {
    const deletedCategory = await this.dbRepository.delete(id);
    if (!deletedCategory) {
      throw new ErrorDeleteCategory('Error al eliminar el curso');
    }
    return 'Categoria eliminada correctamente';
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.dbRepository.findAll();
    return categories.map((category) => Category.create(category));
  }
  async findById(id: string): Promise<Category> {
    const category = await this.dbRepository.findById(id);
    if (!category) {
      throw new NotFoundCategory('Error al eliminar el curso');
    }
    return Category.create(category);
  }
  async update(category: Category, id: string): Promise<string> {
    throw new Error('Method not implemented.' + id + category);
  }
}
