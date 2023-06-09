import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,Unique } from 'typeorm';
@Entity()
 class AirlineType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
  
}
export default AirlineType
