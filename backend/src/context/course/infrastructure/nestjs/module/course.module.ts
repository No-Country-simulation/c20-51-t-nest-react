import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../typeorm/entities/course.entittie';
import { CreateCourseController } from '../controllers/V1/create/create.controller';
import { DeleteCourseController } from '../controllers/V1/delete/delete.controller';
import { FindAllCourseController } from '../controllers/V1/findAll/findAll.controller';
import { FindByIdCourseController } from '../controllers/V1/findById/findById.controller';
import { UpdateCourseController } from '../controllers/V1/update/update.controller';
import { CreateCourseService } from 'src/context/course/application/create/create.service';
import { DeleteCourseService } from 'src/context/course/application/delete/delete.service';
import { FindAllCourseService } from 'src/context/course/application/findAll/findAll.service';
import { FindByIdCourseService } from 'src/context/course/application/findById/findById.service';
import { UpdateCourseService } from 'src/context/course/application/update/update.service';
import { CourseRepository } from 'src/context/course/domain/repository/course.repository';
import { CourseExternalRepository } from '../../repository/course.repository';
import { BasicMethod } from '../../typeorm/repository/basicmethod';
import { GenerateToken } from 'src/context/auth/infrastructure/generateToken/generateToken';
import { UserModule } from 'src/context/user/infrastructure/nestjs/module/user.module';
import { RelationsMethodExternal } from 'src/context/user/infrastructure/adapterExternal/methodExternal';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UserModule],
  controllers: [
    DeleteCourseController,
    FindAllCourseController,
    FindByIdCourseController,
    CreateCourseController,
    UpdateCourseController,
  ],
  providers: [
    UpdateCourseService,
    DeleteCourseService,
    FindAllCourseService,
    FindByIdCourseService,
    CreateCourseService,
    CourseExternalRepository,
    BasicMethod,
    GenerateToken,
    RelationsMethodExternal,
    {
      provide: CourseRepository,
      useExisting: CourseExternalRepository,
    },
  ],
})
export class CourseModule {}
