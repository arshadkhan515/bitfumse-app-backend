const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./database');
const password = require('passport');
const passwordConfig = require('./config/password');
const Routes = require('./routes');
const dotenv = require('dotenv');
const AuthenticationRoute = require('./routes/authenticationRoute');
const passport = require('passport');


app.use(cors());
app.use(express.json());
app.use(password.initialize());


dotenv.config();
passwordConfig(password);

// Connect to MongoDB atlas
connect();


// without Auth Routes
app.use('/api/auth/',AuthenticationRoute);
app.use('/api/',passport.authenticate('jwt', { session: false }), Routes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
