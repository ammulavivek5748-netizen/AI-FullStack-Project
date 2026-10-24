import exp from "express";
import { requireLogin } from "../../middlewares/requireLogin.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { Event } from "../../models/EventModel.js";
import { Organizer } from "../../models/OrganizerModel.js";
import { EventEnroll } from "../../models/EventEnrollModel.js";
import jwt from "jsonwebtoken";


export const studentRouter = exp.Router();

studentRouter.get("/event/get",requireLogin,verifyRole("student"),async(req,res)=>{
    // get all organizers
    const organizers = await Organizer.find();
    // map all the events under each organizer
    const events = await Promise.all(organizers.map(async(details)=>{
        // get the events posted by organizer
        const eventsList = await Event.find({organizerId:details._doc.id});
        // form the structure
        const fullDetailsOfEvent = {userName:details._doc.userName,organization:details._doc.organization,allEvents:eventsList};
        // return the full details of events
        return fullDetailsOfEvent;
    }))
    res.json({success:true,message:"Events retrieved successfully",data:(events.length===0)?"No Organizers posted hackathons":events});
})


studentRouter.post("/event/register/:id",requireLogin,verifyRole("student"),async(req,res)=>{
    // get the event id from params
    const id = req.params.id;
    // get the student id 
    const studentId = jwt.verify(req.cookies.token,process.env.SECRET_KEY).id;
    // create document for enrollment
    const enrollment = {
        eventId:id,
        studentId:studentId
    }
    await EventEnroll.create(enrollment);
    //send the response
    res.status(201).json({success:true,message:"enrolled successfully"});
})
