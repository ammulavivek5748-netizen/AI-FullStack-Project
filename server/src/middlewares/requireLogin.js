import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export function requireLogin(req, res, next) {
    const token = req.cookies.token;
    if (token === undefined) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    else {
        try {
            let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        }
        catch (err) {
            return res.status(401).json({ success: false, message: "Unauthorized access" })
        }
    }
    next();
}
