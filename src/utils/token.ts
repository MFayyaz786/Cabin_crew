import jwt from 'jsonwebtoken';
import User from '../entities/User';


console.log('process.env.JWT_SECRET',process.env.JWT_SECRET)
console.log('process.env.JWT_REFRESH_SECRET',process.env.JWT_REFRESH_SECRET)

interface JWTPayload {
  id: string;
  tokenVersion: number;
}

export const createAccessToken = (user: any): string => {
  const payload: JWTPayload = {
    id: user.id,
    tokenVersion: user.tokenVersion
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN, // access token valid for 15 minutes
  });
};

export const createRefreshToken = (user: any): string => {
  const payload: JWTPayload = {
    id: user.id,
    tokenVersion: user.tokenVersion
  };
  
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as jwt.Secret, {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN, // refresh token valid for 1 days
  });
};

export const verifyToken = async (token: string, isRefreshToken = false): Promise<JWTPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, isRefreshToken ? process.env.JWT_REFRESH_SECRET as jwt.Secret : process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as JWTPayload);
    });
  });
};
