import { Course } from '../../domain/entities/new/course.entitie';
import { ICourse } from '../../domain/entities/new/course.interface';
import { ErrorCreateCourse } from '../../domain/errors/ErrorCreateCourse.exception';
import { CourseRepository } from '../../domain/repository/course.repository';

export class CreateCourseService {
  constructor(private readonly repository: CourseRepository) {}

  async run(course: ICourse): Promise<string> {
    const courseInstance = Course.create(course);
    const newCourse = await this.repository.create(courseInstance);
    if (!newCourse) {
      throw new ErrorCreateCourse('Error al crear el curso');
    }
    return newCourse;
  }
}
