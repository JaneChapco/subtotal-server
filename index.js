const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT;
const mongoURI = process.env.mongoURI;

const app = express();
app.use(cors());
app.use(express.json());

const subscriptionRoutes = require("./routes/subscription-routes.js");
app.use("/subscriptions", subscriptionRoutes);

mongoose.connect(mongoURI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})