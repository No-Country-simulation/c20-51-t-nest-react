import { ErrorDeleteException } from '../../domain/errors/errorDelete.exception';
import { UsersRepository } from '../../domain/repository/user.repository';
import { UserFindDeleteDto } from './userDelete.dto';
import { Injectable } from 'src/utils/injectNest/inject';

@Injectable()
export class UserDeleteUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindDeleteDto): Promise<string> {
    const result = await this.userRepository.delete(dto.id);
    if (!result) throw new ErrorDeleteException(dto.id);
    return result;
  }
}
