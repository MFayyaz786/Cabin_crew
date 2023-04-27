import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user: {
      _id: string;
      // Add other properties as needed
    };
  }
}
