import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contact: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'images/profile.png' })
  image: string;

  @Column({ type: 'int', nullable: true, default: null })
  otp: number;

  @Column({ type: 'timestamp', nullable: true })
  otpExpire: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  token: string;

}

export default User;
