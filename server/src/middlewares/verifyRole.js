export function verifyRole(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role.toLowerCase())) {
            return res.status(403).json({
                message: "Access denied: insufficient permissions"
            });
        }
        next();
    }
}