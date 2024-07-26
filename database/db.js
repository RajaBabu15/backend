require('dotenv').config();
const mongoose = require("mongoose");

exports.connectToDB = async () => {
    try {
        console.log("Connecting to DB");
        await mongoose.connect(
            process.env.MONGO_URI
        );
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
};
