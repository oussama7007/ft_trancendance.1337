import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserContact } from './user-contact.entity';
import { Listing } from '../listings/listing.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column()
  passwordHash: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserContact, (contact) => contact.user)
  contacts: UserContact[];

  @Column({ type: 'varchar', nullable: true, unique: true })
  cin: string | null;

  @OneToMany(() => Listing, (listing) => listing.owner)
  listings: Listing[];
}
// had file ghir bash typeORM t3ref kifach user kandifiniwh mazal maderna tabels 