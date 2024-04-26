const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
const mongoURI = process.env.mongoURI;

const subscriptionRoutes = require("./routes/subscription-routes.js");

app.use("/subscriptions", subscriptionRoutes);

mongoose.connect(mongoURI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`🚀Server is running on port ${PORT}`);
    });
    console.log('📎Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})