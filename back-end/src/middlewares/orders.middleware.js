const userModel = require("../../models/user.js");
const shopAdminModel = require("../../models/shopAdmin.js");
const jwt = require("jsonwebtoken");

async function authRoleMiddleware(req, res, next) {
  const userToken = req.cookies.usertoken;
  const adminToken = req.cookies.admintoken;

  if (!userToken && !adminToken) {
    return res.status(401).json({ message: "Please login first" });
  }

  if (adminToken) {
    try {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
      const admin = await shopAdminModel.findOne({ email: decoded.email }).select("-password");
      if (admin) {
        req.user = admin;
        req.role = "admin";
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  if (userToken) {
    try {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: decoded.email }).select("-password");
      if (user) {
        req.user = user;
        req.role = "user";
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(404).json({ message: "Invalid Account" });
}

function requireAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  return next();
}

function requireUser(req, res, next) {
  if (req.role !== "user") {
    return res.status(403).json({ message: "User access required" });
  }
  return next();
}

module.exports = { authRoleMiddleware, requireAdmin, requireUser };