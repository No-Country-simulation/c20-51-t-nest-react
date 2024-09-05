import { Injectable } from 'src/utils/injectNest/inject';
import { AuthDomainRepository } from '../../domain/repository/authdomain.repository';
import { IUser } from '../../domain/entities/newuser/user.interface';
import { User } from '../../domain/entities/newuser/user.entity';
import { ErrorCreateException } from '../../domain/errors/errorCreate.exception';

@Injectable()
export class SignUpService {
  constructor(private readonly authDomainRepository: AuthDomainRepository) {}

  async run(signUpDto: IUser): Promise<string> {
    const user = User.create(signUpDto);
    const response = await this.authDomainRepository.signUp(user);
    if (!response) throw new ErrorCreateException(signUpDto.email);
    return response;
  }
}
