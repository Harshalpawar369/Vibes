const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});

const shopAdminModel = mongoose.model("shopAdmin", adminSchema);

module.exports = shopAdminModel;