import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,Unique } from 'typeorm';
import User from './user';
@Entity()
export class AirlineType {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToMany(()=>User,{nullable:false})
  user:User

  @Column({ unique: true })
  name: string;
  
}
export default AirlineType
