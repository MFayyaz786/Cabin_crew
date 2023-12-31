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
}from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length ,Matches,IsMobilePhone } from 'class-validator';
export enum UserRole {
  Air_Port_Manager = 'Air_Port_Manager',
  Air_Line_Manager = 'Air_Line_Manager',
  Staff = 'Staff',
}
import Booth from './booth';
import AirlineType from './airlineType';
@Entity()
@Unique(['email', 'phone'])
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() =>Booth,{nullable:true,})
  booth:typeof Booth;

  @ManyToOne(() =>AirlineType,{nullable:true})
  airLine: AirlineType;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  firstName: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  lastName: string;

  @Column({type:String,nullable:false,enum:UserRole})
  @IsNotEmpty()
  role: UserRole

  @Column({type:String,nullable:false,unique:true})
  @IsEmail({}, { message: "Please enter a valid email" })
  email: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{
    message: 'Password must contain at least one letter, one number, and be at least 8 characters long.',
  })
  password: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  @IsMobilePhone("en-US", {}, { message: "Please enter a valid phone number" })
  phone:string;

  @Column({type:Boolean,default:false})
  deleted:boolean

  @Column({type:Number ,nullable:true ,default:null}) 
  otp:number | null
  
   @Column({type:Date,default:null,nullable:true})
   otpExpire:Date|null

  @Column({type:String,nullable :true,default:null})
  token:string|null
  
  @ManyToOne(() =>User)
  createdBy:typeof User;

  @ManyToOne(() =>User)
  updatedBy:typeof User;

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
export default User;
