import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    eventName: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    organizerId: {
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true,
        unique:true
    },
    theme: {
        type:String,
        required:true,
        enum:["software","hardware"]
    },
    mode:{
        type:String,
        required:true,
        enum:["online","offline"]
    },
    venue: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    startDate: {
        type:Date,
        required:true,
        trim:true,
        unique:true
    }, 
    endData: {
        type:Date,
        required:true,
        trim:true,
        unique:true
    }, 
    registrationStart: {
        type:Date,
        required:true,
        trim:true,
        unique:true
    }, 
    registrationEnd: {
        type:Date,
        required:true,
        trim:true,
        unique:true
    }, 
    minTeamSize: {
        type:Number,
        required:true,
        trim:true,
        unique:true
    }, 
    maxTeamSize: {
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    rules: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    bannerImage:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    status:{
        type:String,
        required:true,
        enum:["published","ongoing","completed"],
        trim:true,
        unique:true
    }
}, {
    timestamps: true
});


export const EventModel = model("Event",eventSchema);