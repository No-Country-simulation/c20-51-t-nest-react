import { Course } from '../../domain/entities/new/course.entitie';
import { CourseRepository } from '../../domain/repository/course.repository';
import { UpdateCourse } from '../../domain/entities/update/update.entitie';
import { ErrorCreateCourse } from '../../domain/errors/ErrorCreateCourse.exception';
import { RelationsMethodExternal } from 'src/context/user/infrastructure/adapterExternal/methodExternal';
import { BasicMethod } from '../typeorm/repository/basicmethod';
import { Injectable } from 'src/utils/injectNest/inject';
import { GenerateToken } from 'src/context/auth/infrastructure/generateToken/generateToken';

@Injectable()
export class CourseExternalRepository extends CourseRepository {
  constructor(
    private readonly courseRepository: BasicMethod,
    private readonly userRepository: RelationsMethodExternal,
    private readonly verifyToken: GenerateToken,
  ) {
    super();
  }
  async create(course: Course, token: string): Promise<string> {
    const newCourse = await this.courseRepository.create(course);
    const payload = await this.verifyToken.validateToken(token);
    const user = await this.userRepository.Authors(payload.sub, newCourse);
    const createdCourse = await this.courseRepository.save({
      ...newCourse,
      author: user,
    });
    if (!createdCourse) {
      throw new ErrorCreateCourse('Error al crear el curso');
    }
    return 'Curso creado correctamente';
  }

  async delete(id: string): Promise<string> {
    const deletedCourse = await this.courseRepository.delete(id);
    return deletedCourse;
  }
  async findAll(): Promise<Course[]> {
    return await this.courseRepository.findAll();
  }

  async findById(id: string): Promise<Course> {
    return await this.courseRepository.findById(id);
  }
  async update(course: UpdateCourse, id: string): Promise<string> {
    return await this.courseRepository.update(course, id);
  }
}
