import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  id: string;
  name: string;
  email: string;
  admin: Boolean;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      error: "Token missing!"
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { id, name, email, admin } = verify(token, "77a314f78164258051533668f36790ed") as IPayload;
    
    request.user_id = id;
    request.user_name = name;
    request.user_email = email;
    request.user_admin = admin;
    
    return next();
  } catch (error) {
    return response.status(401).json({
      error: "Token is invalid!"
    });
  }
}