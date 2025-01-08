import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user'; // Import the IUser interface

// Dummy users list for authentication (add password and roles)
const users: IUser[] = [
    { userId: 1, username: 'user1', password: 'password1', roles: ['user'] },
    { userId: 2, username: 'user2', password: 'password2', roles: ['admin'] },
];

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

// Handler for authenticating the user and returning a token
export const authenticate = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign(
            { userId: user.userId, username: user.username, roles: user.roles },
            secretKey,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};
