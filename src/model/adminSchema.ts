// model/adminSchema.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { IAdmin } from '../interface/adminInterface';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' }
}, { timestamps: true });

// Add password comparison method
adminSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Hash password before saving
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12); // Consistent salt rounds
    next();
});

export default mongoose.model<IAdmin>('Admin', adminSchema);