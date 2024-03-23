const express = require('express');
const app = express();
const connectDB = require('./database/db');
const dotenv = require('dotenv');

dotenv.config();


app.listen(process.env.PORT, () => {
    connectDB();
    console.log('MiniWall APP is running on port 5000');
});