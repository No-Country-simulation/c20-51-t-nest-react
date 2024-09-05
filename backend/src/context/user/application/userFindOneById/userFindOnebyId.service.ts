import { Injectable } from 'src/utils/injectNest/inject';
import { UserNotFoundException } from '../../domain/errors/not-found.exception';
import { UserFindOneByIdDtos } from './userFindOnebyId.dto';
import { UsersRepository } from '../../domain/repository/user.repository';
import { IUser } from '../../domain/entities/newuser/user.interface';

@Injectable()
export class UserFindOneByIdUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindOneByIdDtos): Promise<Partial<IUser>> {
    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new UserNotFoundException(dto.id);
    }

    return user.toValueObject();
  }
}
