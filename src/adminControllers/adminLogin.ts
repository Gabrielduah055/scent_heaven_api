import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../model/adminSchema';
import { IAdmin } from '../interface/adminInterface';

export interface AuthRequest extends Request {
    admin?: IAdmin;
}

export const loginAdmin:RequestHandler = async (req: Request, res: Response):Promise<void> => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username }) as IAdmin | null;

        if (!admin) {
            res.status(401).json({ message: 'Admin not found' });
            return;
        }
        const isPasswordCorrect = await admin.comparePassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role, password: admin.password },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Authentication successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
         res.status(500).json({ message: 'Internal server error' });
    }
};

export const logoutAdmin: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}