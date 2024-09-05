import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserDeleteUseCase } from '../../../../../application/userDelete/userDelete.service';
import { V1_ROUTES } from '../../routes';
import { ErrorDeleteException } from 'src/context/user/domain/errors/errorDelete.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class DeleteController {
  constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

  @Delete(V1_ROUTES.USER.DELETE)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.userDeleteUseCase.run({ id });
    } catch (error) {
      if (error instanceof ErrorDeleteException) {
        throw new BadRequestException(error.message);
      }
      throw new NotFoundException(error.message);
    }
  }
}
