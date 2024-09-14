import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configdb } from './config/db';
import * as morgan from 'morgan';
import { UserModule } from './context/user/infrastructure/nestjs/module/user.module';
import { AuthModule } from './context/auth/infrastructure/nestjs/module/auth.module';
import { JwtConfigModule } from './config/jwt.module';
import { CourseModule } from './context/course/infrastructure/nestjs/module/course.module';
import { CategoryModule } from './context/category/infrastructure/nestjs/module/category.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(configdb),
    UserModule,
    AuthModule,
    JwtConfigModule,
    CourseModule,
    CategoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
