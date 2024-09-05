import { Injectable } from 'src/utils/injectNest/inject';
import { AuthDomainRepository } from '../../domain/repository/authdomain.repository';
import { ErrorLoginException } from '../../domain/errors/errorLogin.exception';
import { SignInDto } from './signIn.dto';

@Injectable()
export class SignInService {
  constructor(private readonly authDomainRepository: AuthDomainRepository) {}

  async run(signInDto: SignInDto): Promise<{ token: string }> {
    const token = await this.authDomainRepository.signIn(
      signInDto.email,
      signInDto.password,
    );
    if (!token) throw new ErrorLoginException(signInDto.email);
    return token;
  }
}
