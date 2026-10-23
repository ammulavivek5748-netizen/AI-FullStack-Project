import { Schema, model } from "mongoose";

const enrollSchema = new Schema({
    eventId:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    }
}
,
{
    timestamps:true
})

export const EventEnroll = model("Enrollment",enrollSchema);