import { Schema, model } from "mongoose";

const organizerSchema = new Schema({
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
    organization: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export const Organizer = model("Organizer", organizerSchema);