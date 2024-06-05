import 'dotenv/config';
import * as path from 'path';

import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: false,
  logging: true,
  entities: ['src/orm/entities/../**/*.entity{.ts,.js}'],
  migrations: ['src/orm/migrations/**/*{.ts,.js}'],
  subscribers: ['src/orm/subscriber/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
