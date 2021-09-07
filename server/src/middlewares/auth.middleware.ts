import { Request, Response, NextFunction } from 'express';

// Verify jwt token: Bearer Token
export default function auth(req: Request, res: Response, next: NextFunction) {
  console.log('auth middleware was called.');

  next();
}
