import { Injectable } from 'src/utils/injectNest/inject';
import { UsersRepository } from '../../domain/repository/user.repository';
import { User as UserDB } from '../typeorm/user.entitie';
import { UserUpdate } from '../../domain/entities/updateuser/userupdate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/newuser/user.entity';
import { ErrorDeleteException } from '../../domain/errors/errorDelete.exception';
import { ErrorUpdateException } from '../../domain/errors/errorUpdate.exception';
import { UserNotFoundException } from '../../domain/errors/not-found.exception';

@Injectable()
export class UserRepository extends UsersRepository {
  constructor(
    @InjectRepository(UserDB)
    private readonly userRepository: Repository<UserDB>,
  ) {
    super();
  }
  async delete(id: string): Promise<string> {
    const deleted = await this.userRepository.delete({ id });
    if (deleted.affected === 0) throw new ErrorDeleteException(id);
    return `Usuario con el id ${id} eliminado exitosamente`;
  }
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => User.create(user));
  }
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UserNotFoundException(id);
    return User.create(user);
  }
  async update(user: UserUpdate, id: string): Promise<string> {
    const updated = await this.userRepository.update(user.toValueObject(), {
      id,
    });
    if (updated.affected === 0) throw new ErrorUpdateException(id);
    return `Usuario con el id ${id} actualizado exitosamente`;
  }
}
