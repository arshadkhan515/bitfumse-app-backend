const mongoose = require('mongoose');

const connect = async () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const url = process.env.DB_URL;
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connect;