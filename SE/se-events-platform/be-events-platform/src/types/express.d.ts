import { JwtPayload } from "jsonwebtoken";

export interface IUser extends JwtPayload {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
