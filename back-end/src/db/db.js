const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connected successfully");
        
    })
    .catch((err)=>{
        console.log("there is a error", err);
        
    })
}

module.exports = connectDB;