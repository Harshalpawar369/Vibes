const userModel = require("../../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shopAdminModel = require("../../models/shopAdmin.js");

async function registerUser(req, res) {
    try {
        const { userName, email, password, contactNo } = req.body;
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const escapedEmail = normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const emailMatcher = new RegExp(`^${escapedEmail}$`, "i");

        if (!normalizedEmail) {
            return res.status(400).json({ message: "Email is required" });
        }

        const isuserAlreadyExists = await userModel.findOne({ email: emailMatcher });
        if (isuserAlreadyExists) {
            return res.status(400).json({ message: "User already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await userModel.create({
            userName,
            email: normalizedEmail,
            password: hashedPassword,
            contactNo,
        });

        // 1. Encode userId instead of email
        const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET);

        res.cookie("usertoken", token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
        return res.status(201).json({
            message: "user registred successfully",
            user: {
                email: createdUser.email,
                userName: createdUser.userName,
                contactNo: createdUser.contactNo
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function loginUser(req,res) {
    const {email,password} = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const escapedEmail = normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const emailMatcher = new RegExp(`^${escapedEmail}$`, "i");

    if (!normalizedEmail || !password) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    const checkUserexist = await userModel.findOne({ email: emailMatcher });

    if(!checkUserexist){
        return res.status(400).json({ message: "invalid email or password" });
    } 

    const isPasswordValid = await bcrypt.compare(password, checkUserexist.password);
 
    if(!isPasswordValid){
        return res.status(400).json({ message: "invalid email or password" });
    }

    // 2. Encode userId instead of email
    const token = jwt.sign({ userId: checkUserexist._id }, process.env.JWT_SECRET);

    res.cookie("usertoken", token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({
        message: "user logged-in succssefully",
        user: {
            email: checkUserexist.email,
            userName: checkUserexist.userName,
            contactNo: checkUserexist.contactNo
        }
    });
}

function logoutUSer(req,res){
    res.clearCookie("usertoken");
    res.status(200).json({ message: "logged out successfully" });
}

async function shopAdminRegister(req,res) {
    try {
        const {ownerName, email, phoneNo, password } = req.body;

        const isOwnerExist = await shopAdminModel.findOne({email});

        if(isOwnerExist) return res.status(400).json({ message: "owner already exist" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const createdOwner = await shopAdminModel.create({
            ownerName,
            email,
            password: hashedPassword,
            phoneNo
        });

        // 3. Encode adminId instead of email
        const token = jwt.sign({ adminId: createdOwner._id }, process.env.JWT_SECRET);

        res.cookie("admintoken", token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
        return res.status(201).json({
            message: "owner registred successfully",
            user: {
                email: createdOwner.email,
                ownerName: createdOwner.ownerName,
                phoneNo: createdOwner.phoneNo
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function shopAdminLogin(req,res){
    try {
        const {email,password} = req.body;
        const normalizedEmail = String(email || "").trim().toLowerCase();

        const owner = await shopAdminModel.findOne({email: normalizedEmail});

        if(!owner) return res.status(400).json({message: "invalid email or password"});

        const ispasswordValid = await bcrypt.compare(password, owner.password);

        if(!ispasswordValid){
            return res.status(400).json({message: "email or password invalid"});
        }

        // 4. Encode adminId instead of email
        const token = jwt.sign({ adminId: owner._id }, process.env.JWT_SECRET);

        res.cookie("admintoken", token, { 
            httpOnly: true, 
            sameSite: 'lax', 
            secure: process.env.NODE_ENV === 'production' 
        });

        res.status(200).json({
            message: "owner logged in",
            owner:{
                email: owner.email,
                ownerName: owner.ownerName,
                phoneNo: owner.phoneNo
            }
        });
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

function adminlogout(req,res){
    res.clearCookie("admintoken");
    res.status(200).json({ message: "loggout successefully" });
}

async function isLoggedIn(req, res) {
    const token = req.cookies.usertoken;
    if (!token) {
        return res.status(200).json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 5. Look up by _id using the decoded userId
        const user = await userModel.findById(decoded.userId).select("email userName contactNo");
        if (!user) {
            return res.status(200).json({ loggedIn: false });
        }
        return res.status(200).json({ loggedIn: true, user });
    } catch (error) {
        return res.status(200).json({ loggedIn: false });
    }   
}

module.exports = { 
    registerUser,
    loginUser,
    logoutUSer,
    shopAdminRegister,
    shopAdminLogin,
    adminlogout,
    isLoggedIn
};