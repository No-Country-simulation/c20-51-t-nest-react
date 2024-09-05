import {
  BadRequestException,
  Body,
  Controller,
  NotAcceptableException,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserUpdateUseCase } from 'src/context/user/application/userUpdate/userUpdate.service';
import { UserUpdateDto } from './update.dto';
import { ErrorUpdateException } from 'src/context/user/domain/errors/errorUpdate.exception';

@Controller(V1_ROUTES.BASE)
export class UpdateController {
  constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}

  @Put(V1_ROUTES.USER.UPDATE)
  update(@Body() dto: UserUpdateDto, @Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.userUpdateUseCase.run(dto, id);
    } catch (error) {
      if (error instanceof ErrorUpdateException) {
        throw new BadRequestException(error.message);
      }
      throw new NotAcceptableException(error.message);
    }
  }
}
