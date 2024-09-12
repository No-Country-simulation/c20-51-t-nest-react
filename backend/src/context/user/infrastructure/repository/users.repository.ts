import { Injectable } from 'src/utils/injectNest/inject';
import { UsersRepository } from '../../domain/repository/user.repository';
import { UserUpdate } from '../../domain/entities/updateuser/userupdate.entity';
import { User } from '../../domain/entities/newuser/user.entity';
import { ErrorDeleteException } from '../../domain/errors/errorDelete.exception';
import { ErrorUpdateException } from '../../domain/errors/errorUpdate.exception';
import { UserNotFoundException } from '../../domain/errors/not-found.exception';
import { MethodBasicDB } from '../typeorm/method';

@Injectable()
export class UserRepository extends UsersRepository {
  constructor(private readonly userRepository: MethodBasicDB) {
    super();
  }
  async delete(id: string): Promise<string> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new ErrorDeleteException(id);
    return `Usuario con el id ${id} eliminado exitosamente`;
  }
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => User.create(user));
  }
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(id);
    return User.create(user);
  }
  async update(user: UserUpdate, id: string): Promise<string> {
    const updated = await this.userRepository.update(id, user.toValueObject());
    if (!updated) throw new ErrorUpdateException(id);
    return `Usuario con el id ${id} actualizado exitosamente`;
  }
}
