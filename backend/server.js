const app = require('./app')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exceptions');
    process.exit(1);
});

// Setup config file
dotenv.config({ path: './backend/config/config.env' });

// Connect to db
connectDatabase();

const PORT = process.env.PORT | 5000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} (${process.env.NODE_ENV})`);
});

// Handle promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});