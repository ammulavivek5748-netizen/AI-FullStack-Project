import { Schema, model } from "mongoose";

const mentorSchema = new Schema({
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
    technicalSkills: {
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

export const Mentor = model("Mentor", mentorSchema);