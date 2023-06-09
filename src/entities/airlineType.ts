import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class AirlineType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
  
}
export default AirlineType
