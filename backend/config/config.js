module.exports = {
    // MongoDB Atlas URI
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
  
    // Port for the server
    port: process.env.PORT || 3001
  };
  