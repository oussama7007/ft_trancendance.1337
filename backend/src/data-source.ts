import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Listing } from './listings/listing.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Listing],
  migrations: ['src/migrations/*.ts'],
});