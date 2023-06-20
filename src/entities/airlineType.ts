import  {Entity, PrimaryGeneratedColumn, BeforeInsert,BeforeUpdate, Column, ManyToOne, Unique} from  'typeorm';
import User from "./user"
@Entity()
 class AirlineType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:String, unique: true })
  name: string;

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
export default AirlineType
