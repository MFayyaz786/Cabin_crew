// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   BaseEntity,
//   BeforeInsert,
//   Unique,
// } from 'typeorm';
// import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
// import * as bcrypt from 'bcryptjs';
// import * as crypto from 'crypto';

// @Entity('users')
// @Unique(['email', 'phone'])
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   @IsNotEmpty()
//   firstName: string;

//   @Column()
//   @IsNotEmpty()
//   lastName: string;

//   @Column()
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @Column()
//   @IsPhoneNumber()
//   @IsNotEmpty()
//   phone: string;

//   @Column({ select: false })
//   @Length(8, 32)
//   password: string;

//   @Column({ nullable: true })
//   passwordConfirm: string | null;

//   @Column({ type: 'enum', enum: ['admin', 'user', 'agent', 'driver'], default: 'user' })
//   role: string;

//   @Column({ default: true })
//   isActivated: boolean;

//   @Column({ default: true })
//   isEmailVerified: boolean;

//   @Column({ default: true })
//   isPhoneVerified: boolean;

//   @Column({ nullable: true })
//   phoneVerificationCode: string;

//   @Column({ nullable: true })
//   activationCode: string | null;

//   @Column({ nullable: true })
//   passwordResetCode: string;

//   @Column({ nullable: true })
//   passwordResetExpires: Date;

//   // Lifecycle hooks
//   @BeforeInsert()
//   async hashPassword() {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.passwordConfirm = null;
//   }

//   async correctPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
//     return await bcrypt.compare(candidatePassword, userPassword);
//   }

//   // createAccountActivationLink(): string {
//   //   const activationToken = crypto.randomBytes(32).toString('hex');
//   //   this.activationLink = crypto
//   //     .createHash('sha256')
//   //     .update(activationToken)
//   //     .digest('hex');
//   //   return activationToken;
//   // }

//   createAccountActivationCode(): string {
//     const buf = crypto.randomBytes(3);
//     let code:number |string = buf.readUIntBE(0, 3) % 1000000;
//     code = code.toString().padStart(6, '0');
//     const hash = crypto.createHash('sha256').update(code).digest('hex');
//     this.activationCode = hash;
//     return code;
//   }

//   createPasswordResetToken(): string {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     this.passwordResetCode = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex');
//     this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
//     return resetToken;
//   }
// }

// export default User; // Add this line
