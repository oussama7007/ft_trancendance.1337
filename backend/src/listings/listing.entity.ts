import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListingTranslation } from './listing-translation.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  bedrooms: number;

  @Column()
  hasWifi: boolean;

  @Column()
  imageUrl: string;

  @Column()
  city: string;

  @Column()
  cityEnFr: string;

  @Column()
  district: string;

  @Column()
  districtEnFr: string;

  @Column({ nullable: true })
  ownerName: string;

  @Column({ nullable: true })
  ownerId: number;

  @Column('double precision', { nullable: true })
  lat: number;

  @Column('double precision', { nullable: true })
  lng: number;

  @OneToMany(
    () => ListingTranslation,
    (translation) => translation.listing,
    { cascade: true },
  )
  translations: ListingTranslation[];
}