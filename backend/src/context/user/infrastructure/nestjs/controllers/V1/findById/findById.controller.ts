import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindOneByIdUseCase } from 'src/context/user/application/userFindOneById/userFindOnebyId.service';
import { ApiTags } from '@nestjs/swagger';
import { UserFindOneByIdDto } from './findById.dto';
import { UserNotFoundException } from 'src/context/user/domain/errors/not-found.exception';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindByIdController {
  constructor(private readonly userGetOne: UserFindOneByIdUseCase) {}
  @Get(V1_ROUTES.USER.FIND_ONE)
  findById(@Param('id', ParseUUIDPipe) { id }: UserFindOneByIdDto) {
    try {
      return this.userGetOne.run({ id });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
