// import jwt from 'jsonwebtoken';
// import User from '../entities/User';
// import Token from '@/utils/interfaces/token.interface';

// export const createToken = (user: User): string => {
//   return jwt.sign({ id: user.id }, process.env.JWT_SECRET as jwt.Secret, {
//     expiresIn: '2d',
//   });
// };

// export const verifyToken = async (token: string): Promise<Token> => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
//       if (err) return reject(err);

//       resolve(payload as Token);
//     });
//   });
// };

// export default { createToken, verifyToken };