//// Connection to the database depending of the environment ////

const config = require('config');
const mongoose = require('mongoose');

const USER_DB = config.get('database.user');
const PASSWORD_DB = config.get('database.password');
const DB_NAME = config.get('database.dbName');

const uriConnection = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@lacapsule.fd7ap.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const option = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function createConnection() {
    try {
        const connection = await mongoose.connect(uriConnection, option);
        console.log(`*** Database connection to ${DB_NAME} created ***`);
        return connection;
    } catch (err) {
        console.log('ERROR during database connection', err);
        throw err
    }
}

module.exports = createConnection;