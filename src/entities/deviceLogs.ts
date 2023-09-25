import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DeviceLogs {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable:true})
  LogNo: string;

  @Column({type:String,nullable:true})
  LogTime: string;

  @Column({type:String,nullable:true})
  MajorType: string;

  @Column({type:String,nullable:true})
  MinorType: string;

  @Column({type:String,nullable:true})
  CardNo: string;

  @Column({type:String,nullable:true})
  EmployeeNo: string;

  @Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date
  // and this!
  @Column({type:Date,default: () => 'CURRENT_TIMESTAMP'})
  updatedDate: Date

  @BeforeInsert()
  updateCreatedDate() {
  this.createdDate = new Date()
}

@BeforeUpdate()
updateUpdatedDate() {
this.updatedDate = new Date()
}
}
export default DeviceLogs
