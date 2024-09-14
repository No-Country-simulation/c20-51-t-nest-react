import { ErrorDeleteCourse } from '../../domain/errors/ErrorDelete.exception';
import { CourseRepository } from '../../domain/repository/course.repository';

export class DeleteCourseService {
  constructor(private readonly repository: CourseRepository) {}

  async run(id: string): Promise<string> {
    const deletedCourse = await this.repository.delete(id);
    if (!deletedCourse) {
      throw new ErrorDeleteCourse('Error al eliminar el curso');
    }
    return deletedCourse;
  }
}
