import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../jwt';

export interface AuthedRequest extends Request {
    user?: { id: string; email: string; role: string };
}

export function authMiddleware(req: AuthedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

    if (!token) {
        res.status(401).json({ success: false, message: 'Authorization token missing' });
        return;
    }

    try {
        const decoded = Jwt.verifyJwt(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}


