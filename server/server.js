import exp from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { authRouter } from "./src/routes/authRoute.js";
import { userDetailsRouter } from "./src/routes/userDetailsRoute.js";
import cookieParser from "cookie-parser";
import { organizerRouter } from "./src/services/organizer/eventManagement.js";
import { studentRouter } from "./src/services/student/event.js";


const app = exp();
app.use(cors());
dotenv.config();

app.use(exp.json());
app.use(cookieParser());

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

app.use("/auth",authRouter);
app.use("/user",userDetailsRouter);
app.use("/organize",organizerRouter);
app.use("/student",studentRouter);

app.use((err,req,res,next)=>{
    res.json({success: false, message:"error: "+err.message});
})
