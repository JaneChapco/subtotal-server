const express = require("express");
const router = express.Router();
const Subscription = require('../models/subscriptionModel');

//get all subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json(subscriptions);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get one subscription
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
            const subscription = await Subscription.findById(id);
            if (!subscription) {
                return res.status(404)({ error: 'Subscription not found'});
            }
            res.status(200).json(subscription);
        } catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            }
    });

//add a subscription
router.post('/add', async (req, res) => {
try {
    const newSubscription = await Subscription.create(req.body);
    res.status(200).json(newSubscription);
} catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

//edit a subscription
router.put('/:id', async (req, res) => {
try {
    const { id } = req.params;
    const updatedSubscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
    if(!updatedSubscription) {
        return res.status(404).json({error: `Subscription not found`});
    }
    res.status(200).json(updatedSubscription);
} catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

//delete a subscription
router.delete('/:id', async (req,res) => {
try {
    const { id } = req.params;
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) {
        return res.status(404).json({message: `Subscription not found`});
    }
    res.status(200).json(deletedSubscription);
} catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
})

module.exports = router;