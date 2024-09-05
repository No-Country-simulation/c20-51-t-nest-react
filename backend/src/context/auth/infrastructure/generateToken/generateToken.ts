import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from './interface';
import { User } from '../../domain/entities/newuser/user.entity';
import { Injectable } from 'src/utils/injectNest/inject';

@Injectable()
export class GenerateToken {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(data: User): Promise<{ token: string }> {
    const payload: PayloadJwt = {
      iss: data.id,
      sub: data.email,
      role: data.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
    };
  }
}
