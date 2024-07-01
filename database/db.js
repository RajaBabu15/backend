require('dotenv').config()
const mongoose=require("mongoose")

exports.connectToDB=async()=>{
    try {
        console.log("Connecting to DB");
        await mongoose.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true}
        );
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}