import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
});
