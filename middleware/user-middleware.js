// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel.js');

// const authenticateUser = async (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({message: 'Authorization token is required'});
//     }   
//     try {
//         const decoded = jwt.verify(token, 'jwtSecret');
//         const user = await User.findById(decoded.user.id);

//         if (!user) {
//             return res.status(403).json({message: `unatuhorized to delete subscription`})}

//         req.user = user;
//         next();
//     } catch (err) {
//         res.status(401).json({msg: 'Token is not valid'});
//     }
// };

// module.exports = { authenticateUser };