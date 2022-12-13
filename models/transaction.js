// create transaction model
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add some title'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number'],
    },
    user_id : mongoose.Types.ObjectId,
    category_id :  mongoose.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);