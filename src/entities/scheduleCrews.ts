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
import { JoinColumn, JoinTable } from 'typeorm';
import Flight from './flight';
@Entity()
class scheduleCrews{
  @PrimaryGeneratedColumn('uuid')
  id:string

  @ManyToOne(()=>Crew)
  crew:Crew
 
  @ManyToOne(()=>FlightSchedule)
  scheduledFlight:FlightSchedule

  @ManyToOne(()=>Flight)
  flight:Flight

}
export default  scheduleCrews