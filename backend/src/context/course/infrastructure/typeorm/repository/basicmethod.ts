import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from 'src/utils/injectNest/inject';
import { Course } from '../entities/course.entittie';
import { Course as CourseEntity } from 'src/context/course/domain/entities/new/course.entitie';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateCourse } from 'src/context/course/domain/entities/update/update.entitie';

@Injectable()
export class BasicMethod {
  constructor(
    @InjectRepository(Course) private readonly repository: Repository<Course>,
  ) {}

  async findAll(): Promise<CourseEntity[]> {
    const courses = await this.repository.find();
    return courses.map((course) => CourseEntity.create(course));
  }

  async findById(id: string): Promise<CourseEntity> {
    const course = await this.repository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }
    return CourseEntity.create(course);
  }

  async create(course: CourseEntity): Promise<Course> {
    return await this.repository.create(course.toValueObject());
  }

  async save(course: Course): Promise<Course> {
    return await this.repository.save(course);
  }

  async update(course: UpdateCourse, id: string): Promise<string> {
    const updatedCourse = await this.repository.update(
      id,
      course.toValueObject(),
    );
    if (!updatedCourse) {
      throw new BadRequestException('Error al actualizar el curso');
    }
    return 'Curso actualizado correctamente';
  }

  async delete(id: string): Promise<string> {
    const deletedCourse = await this.repository.delete(id);
    if (deletedCourse.affected === 0) {
      throw new BadRequestException('Error al eliminar el curso');
    }
    return 'Curso eliminado correctamente';
  }
}
