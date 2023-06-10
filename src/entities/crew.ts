import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  Unique,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length ,Matches,IsMobilePhone } from 'class-validator';
import AirlineType from './airlineType';
import User from './user';
@Entity()
class Crew{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true,nullable:false})
  employId:string

  @ManyToOne(() =>AirlineType,{nullable:true})
  airLine: AirlineType;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  name: string;
  
  @Column({nullable:false})
  gender:string

  @Column({nullable:true})
  destination:string

  @Column({nullable:true})
  designation:string

  @Column({nullable:false,unique:true})
  uniqueId:string

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  @IsMobilePhone("en-US", {}, { message: "Please enter a valid phone number" })
  phone:string;

  @Column({nullable:true})
  deviceIp:string

  @Column({nullable:true})
  fingerPrint:string

  @Column({nullable:true})
  image:string
   
  @Column({ nullable: true, default: false })
  isVerified: boolean;

  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToOne(() =>User)
  updatedBy: User;

  @Column({default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date
  // and this!
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  updatedDate: Date
}

export default Crew