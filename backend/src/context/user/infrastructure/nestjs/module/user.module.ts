import { Module } from '@nestjs/common';
import { User } from '../../typeorm/user.entitie';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteController } from '../controllers/V1/delete/delete.controller';
import { UsersRepository } from 'src/context/user/domain/repository/user.repository';
import { UserDeleteUseCase } from 'src/context/user/application/userDelete/userDelete.service';
import { UserRepository } from '../../repository/users.repository';
import { FindAllController } from '../controllers/V1/findAll/findall.controller';
import { UserFindAllUseCase } from 'src/context/user/application/userFindAll/userFindAll.service';
import { FindByIdController } from '../controllers/V1/findById/findById.controller';
import { UserFindOneByIdUseCase } from 'src/context/user/application/userFindOneById/userFindOnebyId.service';
import { UpdateController } from '../controllers/V1/update/update.controller';
import { UserUpdateUseCase } from 'src/context/user/application/userUpdate/userUpdate.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    DeleteController,
    FindAllController,
    FindByIdController,
    UpdateController,
  ],
  providers: [
    UserDeleteUseCase,
    UserFindAllUseCase,
    UserFindOneByIdUseCase,
    UserRepository,
    UserUpdateUseCase,
    { provide: UsersRepository, useExisting: UserRepository },
  ],
})
export class UserModule {}
