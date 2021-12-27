const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

// Setup config file
dotenv.config({ path: './backend/config/config.env' });

app.use(express.json());
app.use(cookieParser());

// import routes
const products = require('./routes/productRoute');
const auth = require('./routes/authRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

// routes
app.use('/api', products);
app.use('/api', auth);
app.use('/api', order);
app.use('/api', payment);

// handle errors
app.use(errorMiddleware);

module.exports = app;