import { Injectable } from 'src/utils/injectNest/inject';
import { MethodBasicDB } from '../typeorm/method';
import { Course } from 'src/context/course/infrastructure/typeorm/entities/course.entittie';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../typeorm/user.entitie';

@Injectable()
export class RelationsMethodExternal {
  constructor(private readonly userRepository: MethodBasicDB) {}

  async Authors(id: string, course: Course): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.courses.push(course);
    const updated = await this.userRepository.update(id, user);
    if (!updated) throw new BadRequestException('User not found');
    return user;
  }
}
