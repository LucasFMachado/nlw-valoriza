declare namespace Express {
  export interface Request {
    user_id: string;
    user_name: string;
    user_email: string;
    user_admin: Boolean;
  }
}