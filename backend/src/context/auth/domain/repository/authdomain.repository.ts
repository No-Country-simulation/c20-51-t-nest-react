import { User } from '../entities/newuser/user.entity';

export abstract class AuthDomainRepository {
  abstract findByEmail(email: string): Promise<User>;
  abstract signUp(user: User): Promise<string>;
  abstract signIn(email: string, password: string): Promise<{ token: string }>;
}
