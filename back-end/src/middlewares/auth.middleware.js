const shopAdminModel = require('../../models/shopAdmin');
const shopitemModel = require('../../models/shopItem');
const jwt = require('jsonwebtoken');

async function authitemMiddleware(req,res,next) {

    
const token = req.cookies.admintoken; 

    if(!token){
      return res.status(401).json({
            message: "please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
const admin = await shopAdminModel.findOne({ email: decoded.email });

        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        req.admin = admin;

        next();

    } catch (error) {
        res.status(401).json({
            message: "invalid token"
        })
    }    
}

module.exports = {
    authitemMiddleware
}