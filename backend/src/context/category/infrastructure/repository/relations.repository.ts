import { Course } from 'src/context/course/infrastructure/typeorm/entities/course.entittie';
import { MethodBasicDB } from '../typeorm/repository/basicMetohd';
import { Category } from '../typeorm/category.entitie';
import { Injectable } from 'src/utils/injectNest/inject';

@Injectable()
export class RelationsRepository {
  constructor(private readonly dbRepository: MethodBasicDB) {}

  async categoryForCourse(course: Course, name: string): Promise<Category> {
    const category = await this.dbRepository.findByName(name);
    category.courses.push(course);
    const categoryUpdated = await this.dbRepository.save(category);
    return categoryUpdated;
  }
}
