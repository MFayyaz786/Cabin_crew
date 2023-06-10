import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, ManyToOne } from 'typeorm';
import User from './user';

@Entity()
class Booth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:String,nullable:false,unique:true})
  name: string;

  @Column()
  location: string;
  
  @Column({type:String,nullable:true})
  type:string

  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToMany(() =>User)
  updatedBy: User;

  @Column({default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date
  // and this!
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  updatedDate: Date
}
export default Booth;
