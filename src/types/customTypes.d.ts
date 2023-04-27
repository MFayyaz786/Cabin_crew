// customTypes.d.ts

import { Request } from 'express';

declare module 'express' {
  interface User {
    _id: string;
    role: string;
  }

  export interface Request {
    user: User;
  }
}
