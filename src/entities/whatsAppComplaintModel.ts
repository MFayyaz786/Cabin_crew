import { Entity, ObjectIdColumn,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('WhatsAppComplaint')
export class WhatsAppComplaintEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  user: string | null;

  @Column({ nullable: true })
  topicId: string | null;

  @Column({ default: 'submitted' })
  status: string;

  @Column({ default: true })
  appendAble: boolean;

  @Column({ nullable: true, default: null })
  charges: number | null;

  @Column('text', { array: true, default: [] })
  text: string[];

  @Column('text', { array: true, default: [] })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
