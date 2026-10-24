import jwt from "jsonwebtoken";

export function verifyRole(...allowedRoles) {
    return (req, res, next) => {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY);
        if (!allowedRoles.includes(decodedToken.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied: insufficient permissions"
            });
        }
        next();
    }
}