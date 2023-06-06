import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, Length ,Matches,IsMobilePhone } from 'class-validator';
export enum UserRole {
  super_admin = 'super_admin',
  admin = 'admin',
  staff = 'staff',
}
@Entity()
@Unique(['email', 'phone'])
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  firstName: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  lastName: string;

  @Column({type:String,nullable:false,enum:UserRole})
  @IsNotEmpty()
  role:UserRole

  @Column({type:String,nullable:false,unique:true})
  @IsEmail({}, { message: "Please enter a valid email" })
  email: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{
    message: 'Password must contain at least one letter, one number, and be at least 8 characters long.',
  })
  password: string;

  @Column({type:String,nullable:false})
  @IsNotEmpty()
  @IsMobilePhone("en-US", {}, { message: "Please enter a valid phone number" })
  phone:string;

  @Column({type:Number ,nullable:true ,default:null}) 
  otp:number | null
  
   @Column({type:Date,default:null,nullable:true})
   otpExpire:Date|null

  @Column({type:String,nullable :true,default:null})
  token:string|null



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
