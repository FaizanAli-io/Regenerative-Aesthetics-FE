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
    /*
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    */
    entities: ['dist/src/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    logging: false,
    synchronize: false,
    ssl: {
      rejectUnauthorized: false, // Required for Neon's SSL
    },
  };

const dataSource = new DataSource(
  dataSourceOptions,
);
dataSource.initialize();
export default dataSource;
