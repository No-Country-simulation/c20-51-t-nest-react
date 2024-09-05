import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigModule } from 'src/config/jwt.module';
import { SignInService } from 'src/context/auth/application/signIn/signIn.service';
import { SignUpService } from 'src/context/auth/application/signup/signup.service';
import { User } from 'src/context/user/infrastructure/typeorm/user.entitie';
import { SignInController } from '../controllers/V1/signin/signIn.controller';
import { SignUpController } from '../controllers/V1/signup/signUp.controller';
import { AuthDomainRepository } from 'src/context/auth/domain/repository/authdomain.repository';
import { AuthRepository } from '../../repository/auth.repository';
import { GenerateToken } from '../../generateToken/generateToken';
import { HashPasswordAndCompare } from '../../hashPassword/hashPassword';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtConfigModule],
  controllers: [SignInController, SignUpController],
  providers: [
    SignUpService,
    SignInService,
    AuthRepository,
    GenerateToken,
    HashPasswordAndCompare,
    {
      provide: AuthDomainRepository,
      useExisting: AuthRepository,
    },
  ],
})
export class AuthModule {}
