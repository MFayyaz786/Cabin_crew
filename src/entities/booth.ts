import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Booth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:String,nullable:false,unique:true})
  name: string;

  @Column()
  location: string;
  
  @Column({type:String,nullable:true})
  type:string
}
export default Booth;
