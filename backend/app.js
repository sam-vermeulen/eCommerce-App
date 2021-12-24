const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// import routes
const products = require('./routes/productRoute');
const auth = require('./routes/authRoute');
const order = require('./routes/orderRoute');

// routes
app.use('/api', products);
app.use('/api', auth);
app.use('/api', order);

// handle errors
app.use(errorMiddleware);

module.exports = app;