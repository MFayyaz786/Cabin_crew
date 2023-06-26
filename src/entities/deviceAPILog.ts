import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DeviceAPILog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable:true})
  path: string;

  @Column({type:'jsonb',nullable:true})
  request: object;

  @Column({type:'jsonb',nullable:true})
  response: object;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
export default DeviceAPILog
