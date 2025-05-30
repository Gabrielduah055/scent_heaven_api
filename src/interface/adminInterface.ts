import { Document } from "mongoose";

export interface IAdmin extends Document {
    username: string;
    email: string;
    password: string;
    role: 'superadmin' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}
