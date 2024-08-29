import { User } from '../entities/newuser/user.entity';
import { UserUpdate } from '../entities/updateuser/userupdate.entity';

export abstract class UsersRepository {
  abstract findById(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract delete(id: string): Promise<string>;
  abstract update(user: UserUpdate, id: string): Promise<string>;
}
