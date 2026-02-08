const messageModel = require('../../models/messageModel.js');
const askDelulu = require("../../services/ai.services.js");

async function sendMessage(req,res){
    const {userMessage} = req.body;
    if(!userMessage){
        return res.status(400).json({message: "Message is required"});
    }   
    try{
        const deluluResponse = await askDelulu(userMessage);

        const newMessage = await messageModel.create({
            userMessage,
            deluluResponse,
           user: req.user._id
        });
        res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } 
    catch(error){
        console.error("sendMessage error:", error);
        res.status(500).json({message: "Internal Server Error"});
    }

}

module.exports = {
    sendMessage
}