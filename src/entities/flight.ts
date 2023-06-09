import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import AirlineType from './airlineType';
export enum FlightStatus {
  in_process = 'in_process',
  not_initiated = 'not_initiated',
  closed = 'closed',
}
@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNo: string;

  @Column()
  destination: string;

  @Column()
  origin: string;

  @Column()
  boardingTime: Date;

  @Column({type:String,nullable:false,enum:FlightStatus})
  status: FlightStatus;

  // @ManyToOne(() =>AirlineType)
  // airline: AirlineType;
}
