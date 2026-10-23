import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    eventName: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    organizerId: {
        type:String,
        required:true,
        trim:true
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
        trim:true
    },
    startDate: {
        type:String,
        required:true,
        trim:true
    }, 
    endDate: {
        type:String,
        required:true,
        trim:true
    }, 
    registrationStart: {
        type:String,
        required:true,
        trim:true
    }, 
    registrationEnd: {
        type:String,
        required:true,
        trim:true
    }, 
    minTeamSize: {
        type:Number,
        required:true,
        trim:true
    }, 
    maxTeamSize: {
        type:Number,
        required:true,
        trim:true
    },
    rules: {
        type:String,
        required:true,
        trim:true
    },
    bannerImage:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        enum:["published","ongoing","completed"],
        trim:true
    }
}, {
    timestamps: true
});


export const Event = model("Event",eventSchema);