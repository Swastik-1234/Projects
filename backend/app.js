
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { connectToDb } = require('./db'); // Import connectToDb function from db.js
const emailRoutes=require('./routes/mailRoutes')
var cors = require('cors')
const redisClient = require('./redis'); 
const app = express();
app.use(express.json());


app.use(cors())
async function initialize() {
    try {
        await connectToDb(); // Connect to MongoDB using Mongoose

        app.use('/auth', authRoutes);
        app.use('/projects', projectRoutes);
        app.use('/send',emailRoutes)


        app.use((req, res, next) => {
            const cacheKey = req.url; // Define a unique cache key based on the request URL

            // Check if the data is cached in Redis
            redisClient.get(cacheKey, (error, data) => {
                if (error) {
                    console.error('Redis error:', error);
                    next(); // Proceed to the next middleware or route handler
                } else if (data) {
                    // If data is found in the cache, send it back as the response
                    res.send(data);
                } else {
                    // If data is not found in the cache, proceed to the next middleware or route handler
                    next();
                }
            });
        });
        const PORT = process.env.PORT|| 3002;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize:', error);
        process.exit(1); // Exit the process if initialization fails
    }
}

initialize();

