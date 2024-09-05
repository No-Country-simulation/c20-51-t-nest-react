import { Injectable } from 'src/utils/injectNest/inject';
import { AuthDomainRepository } from '../../domain/repository/authdomain.repository';
import { User } from '../../domain/entities/newuser/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserDB } from 'src/context/user/infrastructure/typeorm/user.entitie';
import { Repository } from 'typeorm';
import { HashPasswordAndCompare } from '../hashPassword/hashPassword';
import { GenerateToken } from '../generateToken/generateToken';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ErrorCreateException } from '../../domain/errors/errorCreate.exception';
import { ErrorLoginException } from '../../domain/errors/errorLogin.exception';

@Injectable()
export class AuthRepository extends AuthDomainRepository {
  constructor(
    @InjectRepository(UserDB)
    private readonly userRepository: Repository<UserDB>,
    private readonly hashPassword: HashPasswordAndCompare,
    private readonly generateToken: GenerateToken,
  ) {
    super();
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException('No se encontro el usuario con el email');
    return User.create(user);
  }
  async signUp(user: User): Promise<string> {
    const hashpass = await this.hashPassword.hashPassword(user.passraw);
    if (!hashpass) throw new BadRequestException('Error al codificar password');
    const response = await this.userRepository.save({
      password: hashpass,
      ...user.toValueObject(),
    });
    if (!response) throw new ErrorCreateException(user.email);
    return 'Usuario creado exitosamente';
  }
  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.findByEmail(email);
    const comparePassword = await this.hashPassword.comparePassword(
      password,
      user.passraw,
    );
    if (!comparePassword) throw new ErrorLoginException(email);
    return await this.generateToken.generateToken(user);
  }
}
