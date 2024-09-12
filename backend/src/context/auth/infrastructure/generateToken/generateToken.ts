import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from './interface';
import { User } from '../../domain/entities/newuser/user.entity';
import { Injectable } from 'src/utils/injectNest/inject';
import { envs } from 'src/config/envs';

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

  async validateToken(token: string): Promise<PayloadJwt> {
    const currentUser = token?.split(' ')[1];
    return await this.jwtService.verify(currentUser, {
      secret: envs.JWT_SECRET,
    });
  }
}
