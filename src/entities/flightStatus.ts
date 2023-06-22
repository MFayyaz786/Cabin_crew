import { Entity, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate, Column,ManyToMany, ManyToOne } from 'typeorm';
import User from './user';
@Entity()
class Statuses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:String,nullable:false,unique:true,enum:["On-Time","Arrived","Delayed","Expected","Canceled","Check-In","Check-In-Closed","Departed"]})
  status: string;

  @Column({type:Boolean,default:true})
  active:boolean

  @Column({type:Boolean,default:false})
  deleted:boolean

  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToOne(() =>User)
  updatedBy: User;

  @Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date
  // and this!
  @Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
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
export default Statuses;
