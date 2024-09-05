import { IUser } from '../../domain/entities/newuser/user.interface';

export type SignInDto = Pick<IUser, 'email' | 'password'>;
