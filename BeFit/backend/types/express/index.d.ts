import { Request } from 'express'; // ✅ Required to trigger augmentation

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: string;
      email: string;
    };
  }
}
