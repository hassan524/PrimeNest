import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const contectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI as string;
        await mongoose.connect(uri)
        console.log('Database Established')
    } catch (error) {
        
    }
}
export default contectDB