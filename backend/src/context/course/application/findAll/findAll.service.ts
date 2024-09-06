import { Course } from '../../domain/entities/new/course.entitie';
import { CourseRepository } from '../../domain/repository/course.repository';

export class FindAllCourseService {
  constructor(private readonly repository: CourseRepository) {}

  async run(): Promise<Course[]> {
    const courses = await this.repository.findAll();
    return courses;
  }
}
