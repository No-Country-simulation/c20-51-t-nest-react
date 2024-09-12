import { UpdateCourse } from '../../domain/entities/update/update.entitie';
import { ICourseUpdate } from '../../domain/entities/update/updateCourse.interface';
import { ErrorUpdateCourse } from '../../domain/errors/ErrorUpdateCourse.exception';
import { CourseRepository } from '../../domain/repository/course.repository';

export class UpdateCourseService {
  constructor(private readonly repository: CourseRepository) {}

  async run(id: string, course: ICourseUpdate): Promise<string> {
    const courseInstance = UpdateCourse.create(course);
    const updatedCourse = await this.repository.update(courseInstance, id);
    if (!updatedCourse) {
      throw new ErrorUpdateCourse('Error al actualizar el curso');
    }
    return updatedCourse;
  }
}
