import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Accounts } from "../models/AccountsModel.js";

export const authRouter = exp.Router();

// user registration route
authRouter.post("/register", async (req, res) => {
    const { role, email, password } = req.body;
    const existingAccount = await Accounts.findOne({ email: email });
    if (existingAccount !== null) {
        res.status(400).json({ success: false, message: "User already exists" });
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAccount = {
            role: role,
            email: email,
            password: hashedPassword
        };
        await Accounts.create(newAccount);
        res.status(201).json({ success: true, message: "User registered successfully" });
    }
});


// user login route
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const existingAccount = await Accounts.findOne({ email: email });
    if (existingAccount == null) {
        res.status(400).json({ success: false, message: "User does not exist" });
    }
    else {
        const isPasswordCorrect = await bcrypt.compare(password, existingAccount.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        else {
            const token = jwt.sign(
                {
                    id: existingAccount._id,
                    role: existingAccount.role
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "1d"
                }
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            res.status(200).json({ success: true, message: "Login successful" });
        }
    }
});


// user logout
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).json({ success: true, message: "Logout successful" });
});