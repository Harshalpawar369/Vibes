const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    items: [{
        items: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shopItem', 
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1.'],
            default: 1
        }
    }],
    
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNO:{
        type: Number,
        required: true,
        trim: true,
      
    },
    
    totalPrice: {
        type: Number,
        required: true
    },
   
    isDelivered: {
        type: Boolean,
        default: false
    },
   
    deliveredAt: {
        type: Date
    }
}, { 
    
    timestamps: true 
});


orderSchema.virtual('totalItemsCount').get(function() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
});
const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;