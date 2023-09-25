import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserSession')
export class UserSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true,default:null })
  whatsApp: string;

  @Column({nullable:true, default: null })
  verificationId: string;

  @Column({ default: '#' })
  session: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
