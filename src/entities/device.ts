import  { Entity, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate, Column, ManyToOne,Unique,JoinColumn } from 'typeorm';
import User from "./user"
import AirlineType from './airlineType';
import Booth from './booth';
@Entity()
 class Devices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:String,unique: true,nullable:false })
  deviceIp: string;
   
  @Column({type:String,nullable:false,unique:true})
  port:string

  @Column({type:String,})
  userName:string

  @Column({type:String,})
  password:string

  // @ManyToOne(()=>AirlineType)
  // airLine:AirlineType

  // @ManyToOne(()=>Booth)
  // booth:Booth

  @ManyToOne(() => Booth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booth_id' })
  booth: Booth;

  @Column({type:Boolean,default:true})
  isRegisterDevice:boolean

  @Column({type:Boolean,default:false})
  deleted:boolean

  @ManyToOne(() =>User)
  createdBy: User;

  @ManyToOne(() =>User,)
  updatedBy: User;

  @Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date

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
export default Devices
