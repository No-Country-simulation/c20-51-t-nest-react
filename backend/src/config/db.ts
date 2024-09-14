import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';
import { User } from 'src/context/user/infrastructure/typeorm/user.entitie';
import { Course } from 'src/context/course/infrastructure/typeorm/entities/course.entittie';

export const configdb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envs.HOSTDB,
  port: envs.PORTDB,
  username: envs.USERDB,
  password: envs.PASSDB,
  database: envs.DATABASE,
  entities: [User, Course],
  synchronize: true,
  logging: true,
};
