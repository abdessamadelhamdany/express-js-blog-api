import { Request, Response, NextFunction } from 'express';

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  // Verify jwt token: Bearer Token
  next();
}
