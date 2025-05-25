import mongoose from 'mongoose';


const connectAdmin = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Admin database connected successfully");

    });
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to admin database", err);
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/Scent_haven`)
}

export default connectAdmin;


