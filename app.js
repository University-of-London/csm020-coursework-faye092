const express = require('express');
const app = express();
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const path = require('path');
const { errorHandler } = require('./middlewares/error');


dotenv.config();
app.use(express.json());
app.use(cookieParser()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log('MiniWall APP is running on port 5000');
});