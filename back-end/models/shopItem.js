const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemCategory: {
        type: String,
        required: true
    },
    brandName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const shopitemModel = mongoose.model("shopItem", itemSchema)

module.exports = shopitemModel;