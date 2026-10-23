import exp from "express";
import { Event } from "../../models/EventModel.js";
import { requireLogin } from "../../middlewares/requireLogin.js"
import { verifyRole } from "../../middlewares/verifyRole.js";
import jwt from "jsonwebtoken";


export const organizerRouter = exp.Router();

organizerRouter.post("/event/post", requireLogin, verifyRole("organizer"), async (req, res) => {
    // get organizer Id
    const id = jwt.verify(req.cookies.token,process.env.SECRET_KEY).id;
    // get the details of event from body of req
    const { eventName, theme, mode, venue, startDate, endDate, registrationStart, registrationEnd, minTeamSize, maxTeamSize, rules, bannerImage } = req.body;
    // store the details in event document
    const status = "published";
    // full details
    const eventDetails = {
        eventName: eventName,
        organizerId: id,
        theme: theme,
        mode: mode,
        venue: venue,
        startDate: startDate,
        endDate: endDate,
        registrationStart: registrationStart,
        registrationEnd: registrationEnd,
        minTeamSize: minTeamSize,
        maxTeamSize: maxTeamSize,
        rules: rules,
        bannerImage: bannerImage,
        status: status
    }
    await Event.create(eventDetails);
    res.status(200).json({ success: true, message: "Event created Successfully" });
})


organizerRouter.get("/event/get", requireLogin, verifyRole("organizer"), async (req, res) => {
    // get the id of the logged in organizer
    const id = jwt.verify(req.cookies.token,process.env.SECRET_KEY).id;
    // get all event by id 
    const eventData = await Event.find({ organizerId: id });
    // send the response
    console.log(eventData)
    res.json({ success: true, message: "events retrieved successfully", data: (eventData.length === 0)?"No events added yet":eventData});
})
