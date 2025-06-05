import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../model/adminSchema';
import { IAdmin } from '../interface/adminInterface';
import { loginAdmin } from '../adminControllers/adminLogin';

export interface AuthRequest extends Request {
    admin?: IAdmin;
}

const JWT_SECRET = process.env.JWT_SECRET || 'my scret key';

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Authentication required' 
            });
        }

        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({
                    message: err.name === 'TokenExpiredError' 
                        ? 'Token expired' 
                        : 'Invalid token'
                });
            }

            req.admin = decoded as IAdmin;
            next();
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};