import { ICourse } from '../../domain/entities/new/course.interface';
import { UpdateCourse } from '../../domain/entities/update/update.entitie';
import { ErrorUpdateCourse } from '../../domain/errors/ErrorUpdateCourse.exception';
import { CourseRepository } from '../../domain/repository/course.repository';

export class UpdateCourseService {
  constructor(private readonly repository: CourseRepository) {}

  async run(id: string, course: ICourse): Promise<string> {
    const courseInstance = UpdateCourse.create(course);
    const updatedCourse = await this.repository.update(courseInstance);
    if (!updatedCourse) {
      throw new ErrorUpdateCourse('Error al actualizar el curso');
    }
    return updatedCourse;
  }
}
