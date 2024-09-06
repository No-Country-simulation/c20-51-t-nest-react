import { Course } from '../entities/new/course.entitie';

export abstract class CourseRepository {
  abstract findAll(): Promise<Course[]>;
  abstract findById(id: string): Promise<Course>;
  abstract create(course: any): Promise<string>;
  abstract update(course: any): Promise<string>;
  abstract delete(id: string): Promise<string>;
}
