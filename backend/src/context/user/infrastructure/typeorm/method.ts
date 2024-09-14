import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entitie';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IUserUpdate } from '../../domain/entities/updateuser/userupdate.interface';
import { Injectable } from 'src/utils/injectNest/inject';

@Injectable()
export class MethodBasicDB {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async create(user: User): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async update(email: string, user: IUserUpdate): Promise<string> {
    const updatedUser = await this.userRepository.update(email, user);
    if (updatedUser.affected === 0)
      throw new BadRequestException('User not found');
    return 'User updated successfully';
  }

  async delete(id: string): Promise<string> {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected === 0) throw new BadRequestException('User not found');
    return 'User deleted successfully';
  }
}
