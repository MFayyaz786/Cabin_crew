import { Entity,Column,PrimaryGeneratedColumn, } from "typeorm";
@Entity()
export class Auth{
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  userId:string

  @Column()
  uuid:string
}
export default Auth
