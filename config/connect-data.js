import mongoose from "mongoose";
export const connectDB=async()=>{
const DB_URL=process.env.DB_URL||"mongodb+srv://revitalgav_db_user:hg2006@clusterhadasa.uj8yysg.mongodb.net/Libary";
try {
        await mongoose.connect(DB_URL); 
        console.log(`mongo connected succesfuly to ${DB_URL}`);        
    } catch (error) {
        console.log(`mongo connection falied`, error.message);        
    }
} 