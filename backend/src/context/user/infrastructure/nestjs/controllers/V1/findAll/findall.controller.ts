import { Controller, Get } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindAllUseCase } from 'src/context/user/application/userFindAll/userFindAll.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class FindAllController {
  constructor(private readonly userGetAll: UserFindAllUseCase) {}

  @Get()
  findAll() {
    return this.userGetAll.run();
  }
}
