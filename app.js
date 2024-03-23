const express = require('express');
const app = express();
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const { errorHandler } = require('./middlewares/error');


dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log('MiniWall APP is running on port 5000');
});