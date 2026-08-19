import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity('listing_translations')
@Unique(['listingId', 'language'])
export class ListingTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  listingId: number;

  @Column({ length: 2 })
  language: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(
    () => Listing,
    (listing) => listing.translations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'listingId' })
  listing: Listing;
}