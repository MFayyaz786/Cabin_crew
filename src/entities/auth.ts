import { Entity,Column,PrimaryGeneratedColumn, } from "typeorm";
@Entity()
export class Auth{
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column({type:String})
  userId:string

  @Column({type:String})
  uuid:string
}
export default Auth
