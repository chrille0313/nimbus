import { Request, Response, NextFunction } from 'express';
import { auth } from '@/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import config from '@/config';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith(`${config.apiBaseUrl}/specification`)) {
    next();
    return;
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });

  if (!session) {
    res.status(401).jsend.fail({
      message: 'Unauthorized access',
      reason: 'Invalid or missing authentication'
    });
    return;
  }

  req.context = session;
  next();
}
