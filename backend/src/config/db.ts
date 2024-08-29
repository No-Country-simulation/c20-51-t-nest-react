import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';
import { User } from 'src/context/user/infrastructure/typeorm/user.entitie';

export const configdb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envs.HOSTDB,
  port: envs.PORTDB,
  username: envs.USERDB,
  password: envs.PASSDB,
  database: envs.DATABASE,
  entities: [User],
  synchronize: true,
};
