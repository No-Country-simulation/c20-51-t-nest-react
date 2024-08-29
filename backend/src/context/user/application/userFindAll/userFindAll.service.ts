import { Injectable } from 'src/utils/injectNest/inject';
import { UsersRepository } from '../../domain/repository/user.repository';
import { IUser } from '../../domain/entities/newuser/user.interface';

@Injectable()
export class UserFindAllUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(): Promise<Partial<IUser>[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => user.toValueObject());
  }
}
