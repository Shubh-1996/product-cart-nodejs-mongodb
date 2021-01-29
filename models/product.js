const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Products', productSchema);