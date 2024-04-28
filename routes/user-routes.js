// const express = require("express");
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel.js');
// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const auth = require('../middleware/user-middleware.js');
// const session = require('express-session');

// const router = express.Router();
// const secret_key = process.env.secret_key;

// router.use(session({
//     secret: secret_key,
//     resave: false,
//     saveUninitialized: false,
// }));

// router.post('/register', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;

//         const existingUser = await User.findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({message: `Email already registered` });
//             }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ firstName, lastName, email, password: hashedPassword});
//         await newUser.save();

//         return res.status(201).json({ message: `User registered successfully`});
//     } catch (error) {
//         return res.status(500).json({ message: `Internal server error`});
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: `User not found`});
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(404).json({ message: `Invalid password`});
//         }
//         const payload = {
//             user: {
//                 id: user._id,
//                 username: user.username,
//             }
//         }

//         jwt.sign(payload, "jwtSecret", {expiresIn: 3600}, (err, token) => {
//             if (err) {
//                 res.status(500).send('Internal Server Error');
//             }
//             res.json(token);
//         })
//         req.session.userId = user._id;
//         return res.status(200).json({ message: `Login successful`});
//     }   catch (error) {
//         console.error(`Error logging in:`, error);
//         return res.status(500).json({ message: `Internal server error`});
//     }
// })

// router.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.clearCookie('sessionID');
//             res.sendStatus(200);
//         }
//     });
// });

// module.exports = router;