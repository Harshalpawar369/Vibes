const userModel = require("../../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shopAdminModel = require("../../models/shopAdmin.js")

async function registerUser(req, res) {
    try {
        const { userName, email, password, contactNo } = req.body;

       
        const isuserAlreadyExists = await userModel.findOne({ email });
        if (isuserAlreadyExists) {
            return res.status(400).json({ message: "User already exist" });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const createdUser = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            contactNo,
        });

       
        const token = jwt.sign({ email }, process.env.JWT_SECRET);

       
        res.cookie("token", token);
        return res.status(201).json({
            message: "user registred successfully",
            user: {
                email: createdUser.email,
                userName: createdUser.userName,
                contactNo: createdUser.contactNo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function loginUser(req,res) {
    const {email,password} = req.body;

    const checkUserexist = await userModel.findOne({
    email
})

if(!checkUserexist){
    return res.status(400).json({
        message: "invalid email or password"
    })
} 

const isPasswordValid = await bcrypt.compare(password, checkUserexist.password);
 
if(!isPasswordValid){
    return res.status(400).json({
        message: "invalid email or password"
    })
}

const token = jwt.sign({ email: checkUserexist.email }, process.env.JWT_SECRET);

res.cookie("token", token);

res.status(200).json({
    message: "user logged-in succssefully",
    user: {
        email: checkUserexist.email,
        userName: checkUserexist.userName,
        contactNo: checkUserexist.contactNo
    }
})
  
}

function logoutUSer(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "logged out successfully"
    })
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

         const token = jwt.sign({ email }, process.env.JWT_SECRET);

       
        res.cookie("admintoken", token);
        return res.status(201).json({
            message: "owner registred successfully",
            user: {
                email: createdOwner.email,
                ownerName: createdOwner.ownerName,
                phoneNo: createdOwner.phoneNo
            }
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

async function shopAdminLogin(req,res){
    const {email,password} = req.body;

    const owner = await shopAdminModel.findOne({email});

    if(!owner) return res.status(400).json({message: "invalid email or password"})

    const ispasswordValid = await bcrypt.compare(password, owner.password)

    if(!ispasswordValid){
        return res.status(400).json({message: "email or password invalid"})
    }

    const token = jwt.sign({email: owner.email}, process.env.JWT_SECRET);

    res.cookie("admintoken", token);

    res.status(200).json({
        message: "owner logged in",
        owner:{
            email:owner.email,
            ownerName:owner.ownerName,
            phoneNo:owner.phoneNo
        }
    })
}

function adminlogout(req,res){
    res.clearCookie("admintoken");
    res.status(200).json({
        message: "loggout successefully"
    })
}
module.exports = { 
    registerUser,
    loginUser,
    logoutUSer,
    shopAdminRegister,
    shopAdminLogin,
    adminlogout
 };