import mongoose from 'mongoose';


const connectAdmin = async () => {

    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/Scent_haven`)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error("Error connecting to mongo database:", error);
        process.exit(1)
    }
}

 mongoose.connection.on("connected", ()=> {
    console.log("Admin Database connected successfully")
 })

 mongoose.connection.on("error", (err) => {
    console.error("Error connected to admin database:", err)
 })

 mongoose.connection.on("disconnected", ()=> {
    console.log("Admin database disconnected")
 })

export default connectAdmin;


