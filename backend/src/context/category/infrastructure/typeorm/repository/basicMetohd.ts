import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from 'src/utils/injectNest/inject';
import { Repository } from 'typeorm';
import { Category as CategoryDB } from '../../typeorm/category.entitie';
import { Category } from 'src/context/category/domain/entities/category.entitie';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class MethodBasicDB {
  constructor(
    @InjectRepository(CategoryDB)
    private readonly categoryRepository: Repository<CategoryDB>,
  ) {}
  async create(category: Category): Promise<CategoryDB> {
    const newCategory = await this.categoryRepository.save(
      category.toValueObject(),
    );
    if (!newCategory) {
      throw new BadRequestException('Error al crear el curso');
    }
    return newCategory;
  }
  async delete(id: string): Promise<string> {
    const deletedCategory = await this.categoryRepository.delete(id);
    if (deletedCategory.affected === 0) {
      throw new BadRequestException('Error al eliminar el curso');
    }
    return 'Category deleted';
  }
  async findAll(): Promise<CategoryDB[]> {
    return await this.categoryRepository.find();
  }
  async findById(id: string): Promise<CategoryDB> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('No se encuentra el curso');
    }
    return category;
  }
  async update(category: Category, id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
