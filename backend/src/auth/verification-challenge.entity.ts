import{
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('verification_challenges')
export class VerificationChallenge
{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    registrationSessionId: string;

    @Column()
    type: 'email' | 'phone';

    @Column()
    destination: string;

    @Column()
  codeHash: string;

  @Column({ default: 0 })
  attempts: number;

    @Column({type : 'timestamp'})
    expiresAt: Date;
    
    @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;


}