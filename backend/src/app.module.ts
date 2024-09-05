import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configdb } from './config/db';
import * as morgan from 'morgan';
import { UserModule } from './context/user/infrastructure/nestjs/module/user.module';
import { AuthModule } from './context/auth/infrastructure/nestjs/module/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot(configdb), UserModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
