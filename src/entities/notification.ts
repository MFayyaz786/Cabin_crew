const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Unique,
  ManyToOne,
  ManyToMany
} =require('typeorm');
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length ,Matches,IsMobilePhone } from 'class-validator';
import User from './user';
@Entity()
class Notification{

@PrimaryGeneratedColumn('uuid')
id: string

@Column({type:String})
notification:string

@Column({type:String,default:"low"})
intensity:string

@Column({type:String,default:"pending"})
status:string

@Column({type:Boolean,default:false})
deleted:boolean

@Column({type:String})
deliverTo:[string]

@ManyToOne(() =>User)
createdBy: User

@ManyToOne(() =>User)
updatedBy: User

@Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
createdDate: Date
  // and this!
@Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
updatedDate: Date

@BeforeInsert()
updateCreatedDate() {
this.createdDate = new Date()
}

@BeforeUpdate()
updateUpdatedDate() {
this.updatedDate = new Date()
}
};

export default  Notification;
