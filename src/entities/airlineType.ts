import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,Unique } from 'typeorm';
import User from "./user"
@Entity()
 class AirlineType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
   
  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToOne(() =>User,)
  updatedBy: User;
}
export default AirlineType
