import { Schema, model } from "mongoose";

const accountsSchema = new Schema({
    role: {
        type: String,
        enum: ["student", "organizer", "judge", "mentor"],
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}
    , {
        timestamps: true
    })


export const Accounts = model("Account", accountsSchema);