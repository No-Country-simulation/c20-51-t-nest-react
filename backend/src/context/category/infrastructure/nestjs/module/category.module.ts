import { Global, Module } from '@nestjs/common';
import { MethodBasicDB } from '../../typeorm/repository/basicMetohd';
import { CreateCategoryService } from 'src/context/category/application/create/create.service';
import { DeleteCategoryService } from 'src/context/category/application/delete/delete.service';
import { FindAllCategoryService } from 'src/context/category/application/findAll/findAll.service';
import { FindByIdCategoryService } from 'src/context/category/application/findById/findById.service';
import { CategoryExternalRepository } from '../../repository/categoryExternal.repository';
import { CategoryRepository } from 'src/context/category/domain/repository/category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../typeorm/category.entitie';
import { DeleteCategoryController } from '../controllers/V1/delete/delete.controller';
import { CreateCategoryController } from '../controllers/V1/create/create.controller';
import { FindAllCategoryController } from '../controllers/V1/findAll/findAll.controller';
import { FindByIdCategoryController } from '../controllers/V1/findById/findById';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [
    DeleteCategoryController,
    FindAllCategoryController,
    FindByIdCategoryController,
    CreateCategoryController,
  ],
  providers: [
    MethodBasicDB,
    CreateCategoryService,
    DeleteCategoryService,
    FindAllCategoryService,
    FindByIdCategoryService,
    CategoryExternalRepository,
    {
      provide: CategoryRepository,
      useExisting: CategoryExternalRepository,
    },
  ],
  exports: [MethodBasicDB],
})
export class CategoryModule {}
