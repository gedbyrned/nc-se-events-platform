import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface User {
    id: number;
    username: string;
    password: string;
}

// Dummy users list for authentication
const users: User[] = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

// Handler for authenticating the user and returning a token
export const authenticate = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

// Middleware for JWT authentication
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};
