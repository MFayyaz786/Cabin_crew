import { User } from './resources/user/entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
