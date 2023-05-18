import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

@Entity()
@Unique(['email', 'phone'])

class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @Column()
  @Length(8, 32)
  password: string;

  @Column()
  passwordConfirm?: string;

  // @Column({ type: 'enum', enum: ['admin', 'user', 'agent', 'driver'], default: 'user' })
  // role: string;
  @Column({ nullable: true })
  tokenVersion: number;

  //* phone number verification
  @Column({ nullable: true })
  phoneNumberVerificationCode: string;

  @Column('timestamptz', { nullable: true })
  @IsDate()
  phoneNumberVerificationExpires: Date;
  
  @Column({ default: false })
  isPhoneNumberVerified: boolean;

  //* email verification
  @Column({ nullable: true })
  emailVerificationCode: string;

  @Column('timestamptz', { nullable: true })
  @IsDate()
  emailVerificationExpires: Date;
  
  @Column({ default: false })
  isEmailVerified: boolean;


  @Column({ default: true })
  isActivated: boolean;

  @Column({ nullable: true })
  activationCode?: string;

  @Column({ nullable: true })
  passwordResetCode?: string;

  @Column({ nullable: true })
  passwordResetExpires?: Date;


  // // Lifecycle hooks
  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 12);
  //   this.passwordConfirm = undefined;
  // }

  // async correctPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
  //   return await bcrypt.compare(candidatePassword, userPassword);
  // }

  // createAccountActivationCode(): string {
  //   const buf = crypto.randomBytes(3);
  //   let code: number = buf.readUIntBE(0, 3) % 1000000;
  //   code = Number(code.toString().padStart(6, '0'));
  //   const hash = crypto.createHash('sha256').update(String(code)).digest('hex');
  //   this.activationCode = hash;
  //   return String(code);
  // }

  // createPasswordResetToken(): string {
  //   const resetToken = crypto.randomBytes(32).toString('hex');
  //   this.passwordResetCode = crypto
  //     .createHash('sha256')
  //     .update(resetToken)
  //     .digest('hex');
  //   this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  //   return resetToken;
  // }
}


export default User;
