require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');

// const fetch = require('cross-fetch');

const app = express();

// DB connection
mongoose.connect(process.env.DATABASE, {}).then(() => {
    console.log("DB CONNECTED");
});

// Middleware
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const landRoutes = require('./routes/land');
const messageRoutes = require('./routes/messages');

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", landRoutes);
app.use("/api/messages", messageRoutes);

const port = 3001;

app.get('/', (req, res) => {
    res.send('Working');
})

app.listen(process.env.PORT || 3001, () => { console.log("Port is ready");})
