import { Schema, model } from "mongoose";

const judgeSchema = new Schema({
    id:{
        type:Schema.Types.ObjectId,
        ref:"Accounts",
        required:true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    expertise: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


export const Judge = model("Judge", judgeSchema);