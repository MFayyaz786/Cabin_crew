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
import Crew from './crew';
import Flight from './flight';
import AirlineType from './airlineType';
import User from './user';
@Entity()
class FlightSchedule{
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  scheduleDate:Date

  @Column()
  departureDate:Date

  @Column()
  arrivalDate:Date

  @ManyToOne(()=>Crew)
  crew:Crew

  @ManyToOne(()=>AirlineType)
  airLine:AirlineType

  @ManyToOne(()=>Flight)
  flight:Flight

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
export default  FlightSchedule