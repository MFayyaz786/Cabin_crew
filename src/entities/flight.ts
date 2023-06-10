import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, OneToOne } from 'typeorm';
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

  @Column({unique:true})
  flightNo: string;

  @Column()
  destination: string;

  @Column()
  origin: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  boardingTime: Date;

  @Column({type:String,nullable:false,enum:FlightStatus,default:'in_process'})
  status: FlightStatus;

  @ManyToOne(() =>AirlineType)
  airLine: AirlineType;

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
export default Flight

