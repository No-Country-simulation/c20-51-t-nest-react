import { Course } from '../entities/new/course.entitie';
import { UpdateCourse } from '../entities/update/update.entitie';

export abstract class CourseRepository {
  abstract findAll(): Promise<Course[]>;
  abstract findById(id: string): Promise<Course>;
  abstract create(
    course: Course,
    id: string,
    category: string,
  ): Promise<string>;
  abstract update(course: UpdateCourse, id: string): Promise<string>;
  abstract delete(id: string): Promise<string>;
}
