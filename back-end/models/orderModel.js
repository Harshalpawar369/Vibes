const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [{
       
        item: {
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
    phoneNO: {
        type: String,
        required: true,
        trim: true,
    },
    totalPrice: {
       amount: {
        type: Number,
        required: true,
        min: [0, 'Total price cannot be negative.']
       },
       currency: {
        type: String,
        required: true,
        default: 'INR'
       }
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, { 
    timestamps: true,
   
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

orderSchema.virtual('totalItemsCount').get(function() {
    return this.items.reduce((total, current) => total + current.quantity, 0);
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;