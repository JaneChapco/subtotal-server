const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(require('express-session')({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));



router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({message: 'Email already registered' });
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword});
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.post('/login', async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found '});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({ message: 'Invalid password'});
        }
        req.session.userId= user._id;
        return res.status(200).json({ message: 'Login successful'});
    }   catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})

module.exports = router;