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
}=require('typeorm');
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length ,Matches,IsMobilePhone, isNotEmpty } from 'class-validator';
import Flight from './flight';
import AirlineType from './airlineType';
import User from './user';
export enum FlightStatus {
  delayed="Delayed",
  advanced="Advanced",
  expected="Expected",
  on_Time="On-Time",
  arrived="Arrived",
  canceled="Canceled",
  departed="Departed",
  check_in="Check-In",
  check_out="Check-Out",
  check_in_closed="Check-In-Closed",
  check_out_closed="Check-Out-Closed"
}
@Entity()
class FlightSchedule{
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column({type:Date})
  scheduleDate:Date

  @Column({type:Date})
  departureDate:Date

  @Column({type:Date})
  arrivalDate:Date

  @ManyToOne(()=>AirlineType)
  airLine:AirlineType

  @ManyToOne(()=>Flight)
  flight:Flight

  @Column({type:Boolean,default:true})
  isSchedule:boolean

  @Column({type:Boolean,default:false})
  isLand:boolean

  @Column({type:String,enum:FlightStatus,nullable:true,default:FlightStatus.expected})
  flightStatus:FlightStatus

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
export default  FlightSchedule