const mongoose = require("mongoose");

const dbConnect = async () => {

    try {
        const DB_URI = process.env.DB_URI 
        mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("|$$$$$$$$$$| CONNECTED TO MONGODB |$$$$$$$$$$|");
    } catch (err) {
        
        console.log("|$$$$$$$$$$| ERROR |$$$$$$$$$$|");
        process.exit();
    }
}

module.exports = {dbConnect}