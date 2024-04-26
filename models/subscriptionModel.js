const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a subscription name"]
        },
        category: {
            type: String, 
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;