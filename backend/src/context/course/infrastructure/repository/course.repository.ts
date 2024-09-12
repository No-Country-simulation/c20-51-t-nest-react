import { Repository } from 'typeorm';
import { Course } from '../../domain/entities/new/course.entitie';
import { Course as CourseDB } from '../typeorm/entities/course.entittie';
import { CourseRepository } from '../../domain/repository/course.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCourse } from '../../domain/entities/update/update.entitie';
import { ErrorCreateCourse } from '../../domain/errors/ErrorCreateCourse.exception';
import { RelationsMethodExternal } from 'src/context/user/infrastructure/adapterExternal/methodExternal';

export class CourseExternalRepository extends CourseRepository {
  constructor(
    @InjectRepository(CourseDB)
    private readonly courseRepository: Repository<CourseDB>,
    private readonly userRepository: RelationsMethodExternal,
  ) {
    super();
  }
  async create(course: Course, id: string): Promise<string> {
    const newCourse = this.courseRepository.create(course.toValueObject());
    const user = await this.userRepository.Authors(id, newCourse);
    const createdCourse = await this.courseRepository.save({
      ...newCourse,
      author: user,
    });
    if (!createdCourse) {
      throw new ErrorCreateCourse('Error al crear el curso');
    }
    return 'Curso creado correctamente';
  }
  delete(id: string): Promise<string> {}
  findAll(): Promise<Course[]> {}
  findById(id: string): Promise<Course> {}
  update(course: UpdateCourse): Promise<string> {}
}
