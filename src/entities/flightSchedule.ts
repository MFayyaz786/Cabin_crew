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
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length ,Matches,IsMobilePhone } from 'class-validator';
import Flight from './flight';
import AirlineType from './airlineType';
import User from './user';
@Entity()
class FlightSchedule{
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  scheduleDate:Date

  @Column({})
  departureDate:Date

  @Column()
  arrivalDate:Date

  @ManyToOne(()=>AirlineType)
  airLine:AirlineType

  @ManyToOne(()=>Flight)
  flight:Flight

  @Column({default:true})
  isSchedule:boolean

  @Column({default:false})
  isLand:boolean

  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToOne(() =>User)
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
export default  FlightSchedule