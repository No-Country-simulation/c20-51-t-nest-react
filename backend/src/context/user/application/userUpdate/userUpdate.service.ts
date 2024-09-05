import { ErrorUpdateException } from '../../domain/errors/errorUpdate.exception';
import { Injectable } from 'src/utils/injectNest/inject';
import { UsersRepository } from '../../domain/repository/user.repository';
import { IUserUpdate } from '../../domain/entities/updateuser/userupdate.interface';
import { UserUpdate } from '../../domain/entities/updateuser/userupdate.entity';

@Injectable()
export class UserUpdateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: IUserUpdate, id: string): Promise<string> {
    const user = UserUpdate.create(dto);
    if (!user) throw new ErrorUpdateException(id);
    return await this.userRepository.update(user, id);
  }
}
