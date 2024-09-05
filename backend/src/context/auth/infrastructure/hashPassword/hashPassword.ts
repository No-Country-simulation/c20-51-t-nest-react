import * as bcrypt from 'bcrypt';
import { Injectable } from 'src/utils/injectNest/inject';

@Injectable()
export class HashPasswordAndCompare {
  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const comparePassword = await bcrypt.compare(password, hashPassword);

    return comparePassword;
  }
}
