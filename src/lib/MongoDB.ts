require('dotenv').config();
const mongoose = require('mongoose');

async function initDBConnection() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = process.env.MONGODB_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    try {
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("MongoDB database connection established successfully");
        });

    } catch (e) {
        console.error(e);
    }
}

export default initDBConnection;