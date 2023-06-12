import { Entity, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate, Column, ManyToOne,Unique } from 'typeorm';
import User from "./user"
import AirlineType from './airlineType';
import Booth from './booth';
@Entity()
 class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true,nullable:false })
  deviceIp: string;
   
  @Column({nullable:false})
  port:string

  @Column()
  userName:string

  @Column()
  password:string

  @Column()
  airLine:string

  @Column()
  booth:String

  @Column({default:true})
  isRegisterDevice:boolean

  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToOne(() =>User,)
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
export default Device
