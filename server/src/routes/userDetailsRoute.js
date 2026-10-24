import exp from "express";
import { Accounts } from "../models/AccountsModel.js";
import { Judge } from "../models/JudgeModel.js";
import { Mentor } from "../models/MentorModel.js";
import { Organizer } from "../models/OrganizerModel.js";
import { Student } from "../models/StudentModel.js";
import { requireLogin } from "../middlewares/requireLogin.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import jwt from "jsonwebtoken";


export const userDetailsRouter = exp.Router();

userDetailsRouter.post("/details", requireLogin, verifyRole("organizer", "student"), async (req, res) => {
    const id = jwt.verify(req.cookies.token,process.env.SECRET_KEY).id;
    const account = await Accounts.findById(id);
    const { role } = account;
    const details = req.body;
    let model;
    if (role === "student") {
        model = Student;
    }
    else if (role === "organizer") {
        model = Organizer;
    }
    else if (role === "judge") {
        model = Judge;
    }
    else if (role === "mentor") {
        model = Mentor;
    }
    const existingDetails = await model.findOne({ id: id });
    if (existingDetails !== null) {
        return res.status(401).json({ success: false, message: "Details already exist" });
    }
    const completeDetails = {
        id: account._id,
        ...details
    }
    await model.create(completeDetails);
    res.status(200).json({ success: true, message: "details stored successfully" })
})