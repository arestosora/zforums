import { Request } from 'express';
import { User } from './common/schemas/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
