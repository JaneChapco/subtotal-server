const express = require("express");
const router = express.Router();

const Subscription = require('../models/subscriptionModel');

//get all subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json(subscriptions);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//get one subscription
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
            const subscription = await Subscription.findById(id);
            res.status(200).json(subscription);
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
            }
    });

//add a subscription
router.post('/', async (req, res) => {
try {
    const subscriptions = await Subscription.create(req.body);
    res.status(200).json(subscriptions);
} catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
}
});

//edit a subscription
router.put('/:id', async (req, res) => {
try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndUpdate(id, req.body);
    if(!subscription) {
        return res.status(404).json({message: `subscription not found`});
    }
    res.status(200).json(subscription);
} catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
}
});

//delete a subscription
router.delete('/:id', async (req,res) => {
try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndDelete(id);
    if (!subscription) {
        return res.status(404).json({message: `subscription not found`});
    }
    res.status(200).json(subscription);
} catch(error) {
    res.status(500).json({message: error.message});
}
})

module.exports = router;