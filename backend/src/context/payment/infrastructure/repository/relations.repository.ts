import { BasicMethod } from 'src/context/course/infrastructure/typeorm/repository/basicmethod';
import { Injectable } from 'src/utils/injectNest/inject';
import { Payment } from '../../domain/entitie/payments.entitie';
import { Payment as PaymentDB } from '../typeorm/entitie/payment.entitie';
import { Course } from 'src/context/course/infrastructure/typeorm/entities/course.entittie';
import { MethodBasicDB } from 'src/context/user/infrastructure/typeorm/method';
import { User } from 'src/context/user/infrastructure/typeorm/user.entitie';
import { GenerateToken } from 'src/context/auth/infrastructure/generateToken/generateToken';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RelationsRepository {
  constructor(
    private readonly courseRepository: BasicMethod,
    private readonly jwtRepository: GenerateToken,
    private readonly userRepository: MethodBasicDB,
  ) {}

  async relationsCourse(payment: Payment): Promise<Course[]> {
    const courses = await this.courseRepository.findCoursesById(payment.course);
    if (courses.length === 0) {
      throw new NotFoundException('No se encontraron cursos');
    }
    return courses;
  }

  async relationsUser(token: string): Promise<User> {
    const payload = await this.jwtRepository.validateToken(token);
    return await this.userRepository.findByEmail(payload.sub);
  }

  async relationsUserPayment(payment: PaymentDB, user: User): Promise<void> {
    user.payments.push(payment);
    await this.userRepository.update(user.email, user);
  }
}
