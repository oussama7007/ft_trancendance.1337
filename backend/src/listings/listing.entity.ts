import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}