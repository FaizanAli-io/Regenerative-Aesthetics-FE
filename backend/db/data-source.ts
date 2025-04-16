import {
  DataSource,
  DataSourceOptions,
} from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions =
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['../src/**/*.entity.js'],
    migrations: ['../db/migrations/*.js'],
    logging: false,
    synchronize: false,
    ssl: { rejectUnauthorized: false },
  };

const dataSource = new DataSource(
  dataSourceOptions,
);
dataSource.initialize();
export default dataSource;
