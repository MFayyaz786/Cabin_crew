import  { Entity, PrimaryGeneratedColumn, Column,BeforeInsert,BeforeUpdate, ManyToOne, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import AirlineType from './airlineType';
export enum FlightStatus {
  in_process = 'in_process',
  not_initiated = 'not_initiated',
  closed = 'closed',
}
import User from "./user"
@Entity()
 class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:String,unique:true})
  flightNo: string;

  @Column({type:String,})
  destination: string;

  @Column({type:String,})
  origin: string;

  @Column({type:Date, default: () => 'CURRENT_TIMESTAMP' })
  boardingTime: Date;

  @Column({type:String,nullable:false,enum:FlightStatus,default:'in_process'})
  status: FlightStatus;

  @ManyToOne(() =>AirlineType)
  airLine: AirlineType;

  @Column({type:Boolean,default:false})
  deleted:boolean
  
  @Column({type:Boolean,default:true})
  isActive:boolean

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
export default Flight

