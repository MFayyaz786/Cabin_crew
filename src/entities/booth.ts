import { Entity, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate, Column,ManyToMany, ManyToOne } from 'typeorm';
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

  @BeforeInsert()
  updateCreatedDate() {
    this.createdDate = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate() {
    this.updatedDate = new Date();
  }
}
export default Booth;
