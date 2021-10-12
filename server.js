// Require dependencies
const express = require('express');

// Initialize App
const app = express();

// Configure App Settings
require('dotenv').config();

// Connect to mongoDB

// Mount Middlewares

// Mount Routes

// App Listener
const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Express is listening on port:${PORT}`);
}); 
