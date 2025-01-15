"use strict";
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { getUserByUsername } from '../models/userModel'; 
// import { IUser } from '../types/User';  
// const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
// // Handler for authenticating the user and returning a token
// export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { username, password } = req.body;
//   try {
//     // Fetch the user by username from the database
//     const user: IUser | null = await getUserByUsername(username);
//     if (user && user.password === password) {
//       const token = jwt.sign(
//         { id: user.userId, username: user.username },
//         secretKey,
//         { expiresIn: '24h' }
//       );
//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid username or password' });
//     }
//   } catch (err) {
//     next(err); // Pass the error to the next middleware (error handler)
//   }
// };
// // JWT authentication middleware
// export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer <token> format
//   if (token) {
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         return res.sendStatus(403); // Forbidden if token is invalid
//       }
//       req.user = user; // Attach user to the request object for further access
//       next(); // Proceed to the next middleware or route handler
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized if no token is provided
//   }
// };
