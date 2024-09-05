import {
  BadRequestException,
  Body,
  Controller,
  NotAcceptableException,
  Post,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './sigIn.dto';
import { SignInService } from 'src/context/auth/application/signIn/signIn.service';
import { ErrorLoginException } from 'src/context/auth/domain/errors/errorLogin.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SignInController {
  constructor(private readonly signInService: SignInService) {}
  @Post(V1_ROUTES.AUTH.SIGNIN)
  async signIn(@Body() signInDto: SignInDto) {
    try {
      return await this.signInService.run(signInDto);
    } catch (error) {
      if (error instanceof ErrorLoginException) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(error.message);
    }
  }
}
