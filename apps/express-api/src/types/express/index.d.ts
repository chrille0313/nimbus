import { SessionContext } from '@/lib/auth';

declare global {
  namespace Express {
    interface Request {
      context: SessionContext;
    }
  }
}
