import exp from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
const app = exp();
app.use(cors());
dotenv.config();

app.use(exp.json());

async function connectToDB(){
    try{
        await connect(process.env.MONGO_URL);
        console.log("connected to db");
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port http://localhost:${process.env.PORT}`);
        });
    }
    catch(err){
        console.log("error in connecting to db", err);
    }
}

connectToDB();

app.use((err,req,res,next)=>{
    res.json({success:false, message:"error: "+err.message});
})