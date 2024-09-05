import {
  BadRequestException,
  Body,
  Controller,
  NotAcceptableException,
  Post,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { ApiTags } from '@nestjs/swagger';
import { SignUpService } from 'src/context/auth/application/signup/signup.service';
import { SignUpDto } from './signUp.dto';
import { ErrorCreateException } from 'src/context/auth/domain/errors/errorCreate.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}
  @Post(V1_ROUTES.AUTH.SIGNUP)
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      return await this.signUpService.run(signUpDto);
    } catch (error) {
      if (error instanceof ErrorCreateException) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(error.message);
    }
  }
}
