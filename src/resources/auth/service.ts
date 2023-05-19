import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../entities/user';
import { verifyToken,createAccessToken, createRefreshToken } from '../../utils/token';
import AppError from '../../utils/appError';
import bcrypt from 'bcryptjs';
import smsServices from '../../utils/smsService';
class AuthService {

  async refreshToken(token: string,next: any) {
    let payload: any = null;

    try {
      payload = await verifyToken(token, true);
    } catch (err) {
      throw new AppError('Invalid token!', 401);
    }

    const user = await getRepository(User).findOne(payload.id);

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      throw new AppError('Invalid token!', 401);
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async signUp(data: any) {
    const hashedPassword = await hash(data.password, 10);
    // create user instance
    let user : any = getRepository(User).create({ ...data, password: hashedPassword });
  
    // save the user and wait for it to complete
    user = await getRepository(User).save(user);


    //* Create otp
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // generate 6-digit code
    user.phoneNumberVerificationCode  = verificationCode.toString();

    
    //* code is valid for next 1 minutes
    user.phoneNumberVerificationExpires = new Date(Date.now() + 1*60*1000);
    await getRepository(User).save(user);

    //* send Message
    const message = `Your verification code is ${verificationCode}`;
    await smsServices.sendSMS(message, user.phone, new Date());
    
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
  
    return {user,accessToken, refreshToken };

  }

  async signIn(email: string, password: string) {

    const user = await getRepository(User).findOne({ where: { email }});
    if (!user) {
      throw new AppError('No user found with this email', 404);
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid username or password', 400);
    }

    if(!user.isPhoneNumberVerified){
      throw new AppError('Please verify your phone number', 400);
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async updatePassword(userId: string, newPassword: string) {
    // const hashedPassword = await hash(newPassword, 10);
    // await getRepository(User).update(userId, { password: hashedPassword });
  }

  async forgotPassword(email: string) {
    // const user = await getRepository(User).findOne({ where: { email } });
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // const resetToken = crypto.randomBytes(32).toString('hex');
    // user.passwordResetCode = crypto.createHash('sha256').update(resetToken).digest('hex');
    // user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes to reset password
    // await getRepository(User).save(user);
    // Send resetToken to user's email
  }

  async verifyOTP(id: string, code: string) {
    const user : any = await getRepository(User).findOneBy({id});
    if (!user) {
      throw new AppError('User not found', 404);
    }
    

    if (user.phoneNumberVerificationCode !== code || 
        new Date() > user.phoneNumberVerificationExpires) {
      throw new AppError('Invalid or expired verification code', 400);
    }
    
    user.isPhoneNumberVerified = true;
    user.phoneNumberVerificationCode = null; // clear the code
    user.phoneNumberVerificationExpires = null; // clear expiration time
    await getRepository(User).save(user);
    
    return { message: 'Phone number verified successfully' };
  }

  async generateOTP(phone: string) {
    const user : any = await getRepository(User).findOneBy({phone});
    if (!user) {
      throw new AppError('User not found', 404);
    }

    //* Create otp
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // generate 6-digit code
    user.phoneNumberVerificationCode  = verificationCode.toString();
    
    //* code is valid for next 1 minutes
    user.phoneNumberVerificationExpires = new Date(Date.now() + 1*60*1000);
    await getRepository(User).save(user);

    //* send Message
    const message = `Your verification code is ${verificationCode}`;
    await smsServices.sendSMS(message, user.phone, new Date());

    return 
  }

  async resetPassword(userId: string, resetToken: string, newPassword: string) {
    // const user = await getRepository(User).findOne(userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // if (user.passwordResetCode !== hashedResetToken || new Date() > user.passwordResetExpires) {
    //   throw new Error('Invalid or expired password reset token');
    // }
    // user.password = await hash(newPassword, 10);
    // user.passwordResetCode = null;
    // user.passwordResetExpires = null;
    // await getRepository(User).save(user);
  }
}

export default new AuthService();
