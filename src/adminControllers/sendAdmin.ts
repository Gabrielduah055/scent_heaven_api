
import bcrypt from 'bcryptjs';
import Admin from '../model/adminSchema';
import connectAdmin from '../config/admin_db';
import dotenv from 'dotenv';
dotenv.config();



const createAdmin = async () => {
    try {
        console.log('Connecting to the database...');
        
        await connectAdmin();

        // Check if the admin already exists
          const existingAdmin = await Admin.findOne({ email: 'gabbyduah055@gmail.com' });
        if (existingAdmin) {
            console.log('Admin already exists');
        }


            const newAdmin = new Admin({
                username: 'Gabbyduah',
                email: 'gabbyduah055@gmail.com',
                password: 'Gabbyduah055$',
                role: 'admin'
            });
            
            await newAdmin.save();
            console.log('Admin created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
        
    }
            
}

    createAdmin()
