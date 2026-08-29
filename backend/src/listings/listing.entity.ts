import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ListingTranslation } from './listing-translation.entity';
import { User } from '../users/user.entity';

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

  @ManyToOne(() => User, (user) => user.listings, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User | null;

  @Column({ nullable: true })
  ownerId: number | null;

  @Column('double precision', { nullable: true })
  lat: number | null;

  @Column('double precision', { nullable: true })
  lng: number | null;

  @OneToMany(
    () => ListingTranslation,
    (translation) => translation.listing,
    { cascade: true },
  )
  translations: ListingTranslation[];
}