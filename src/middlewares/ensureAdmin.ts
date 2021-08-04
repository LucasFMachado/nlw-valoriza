import { Request, Response, NextFunction } from 'express';
 
export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id, user_admin } = request;

  if (user_admin) {
    return next();
  }

  return response.status(401).json({
    error: "User unauthorized!"
  });
}