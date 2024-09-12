import { ICourse } from '../../domain/entities/new/course.interface';
import { NotFoundCourse } from '../../domain/errors/NotFoundCourse.exception';
import { CourseRepository } from '../../domain/repository/course.repository';

export class FindByIdCourseService {
  constructor(private readonly repository: CourseRepository) {}

  async run(id: string): Promise<ICourse> {
    const course = await this.repository.findById(id);
    if (!course) {
      throw new NotFoundCourse('Error al obtener el curso');
    }
    return course.toValueObject();
  }
}
