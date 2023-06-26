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
import Crew from './crew';
import User from './user';
import FlightSchedule from './flightSchedule';
import AirlineType from './airlineType';
@Entity()
class scheduleFlightCrew{
  @PrimaryGeneratedColumn('uuid')
  id:string

  @ManyToOne(()=>Crew)
  crews:Crew[]
 
  @ManyToOne(()=>FlightSchedule)
  scheduledFlight:FlightSchedule

  @ManyToOne(()=>AirlineType)
  airLine:AirlineType

  @Column({type:Boolean,default:false})
  isLand:boolean

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
export default  scheduleFlightCrew