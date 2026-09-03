const userModel = require("../../models/user.js");
const jwt = require("jsonwebtoken");

async function authRoleMiddleware(req, res, next) {
    const userToken = req.cookies.usertoken;

    if (!userToken) {
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        
    
        const user = await userModel.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "Invalid Account" });
        }

        req.user = user;
        req.role = "user";
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

function requireUser(req, res, next) {
    if (req.role !== "user") {
        return res.status(403).json({ message: "User access required" });
    }
    return next();
}

module.exports = { authRoleMiddleware, requireUser };