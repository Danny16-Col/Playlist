//connection mongodb
import 'dotenv/config'
import mongoose from "mongoose";

const dbconnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to mongoseDB successful');
        
    }catch(error){
        console.log('Error connection to mongoDb', error.message);
        
    }
}

export default dbconnection; 