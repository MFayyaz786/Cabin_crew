import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Unique,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber,IsNumberString, Length ,Matches,IsMobilePhone } from 'class-validator';
import AirlineType from './airlineType';
import User from './user';
@Entity()
class Crew{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:Number,unique:true,nullable:false})
  @IsNumberString()
  @Length(32)
  employId:number

  @ManyToOne(() =>AirlineType,{nullable:true})
  airLine: AirlineType;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  name: string;
  
  @Column({type:String,nullable:false})
  gender:string

  @Column({type:String,nullable:true})
  destination:string

  @Column({type:String,nullable:true})
  designation:string

  @Column({type:String,nullable:false,unique:true})
  uniqueId:string

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  @IsMobilePhone("en-US", {}, { message: "Please enter a valid phone number" })
  phone:string;

  @Column({type:String,nullable:true})
  deviceIp:string

  @Column({type:String,nullable:true})
  fingerPrint:string

  @Column({type:String,nullable:true})
  image:string

  @Column({type:Number,nullable:true})
   @IsNumberString()
  @Length(32)
  cardNo:number

  @Column({type:String,nullable:true,default:'comments'})
  comments:string
   
  @Column({type:Boolean, nullable: true, default: false })
  isVerified: boolean;

  @Column({type:Boolean,  default: false })
  onDuty: boolean;

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

export default Crew