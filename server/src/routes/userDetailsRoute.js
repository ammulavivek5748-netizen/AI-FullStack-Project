import exp from "express";
import { Accounts } from "../models/AccountsModel.js";
import { Judge } from "../models/JudgeModel.js";
import { Mentor } from "../models/MentorModel.js";
import { Organizer } from "../models/OrganizerModel.js";
import { Student } from "../models/StudentModel.js";


export const userDetailsRouter = exp.Router();

userDetailsRouter.post("/:id/details", async (req, res) => {
    const id = req.params.id;
    const account = await Accounts.findById(id);
    const { role } = account;
    const details = req.body;
    let model;
    if (role === "student") {
        model = Student;
    }
    else if (role === "organizer") {
        model = Organizer ;
    }
    else if (role === "judge") {
        model = Judge ;
    }
    else if (role === "mentor") {
        model = Mentor ;
    }
    const existingDetails = await model.findOne({ id: id });
        if (existingDetails !== null) {
            return res.status(401).json({ success: false, message: "Details already exist" });
        }
        const completeDetails = {
            id : account._id,
            ...details
        }
        await model.create(completeDetails);
        res.status(200).json({success:true,message:"details stored successfully"})
})