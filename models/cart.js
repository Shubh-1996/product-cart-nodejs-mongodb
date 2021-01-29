const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Carts', cartSchema);