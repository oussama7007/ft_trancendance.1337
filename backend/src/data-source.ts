import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Listing } from './listings/listing.entity';
import { ListingTranslation } from './listings/listing-translation.entity';

dotenv.config({ path: '../.env' });

export default new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Listing, ListingTranslation],
  migrations: ['src/migrations/*.ts'],
});