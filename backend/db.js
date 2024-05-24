// const {MongoClient}=require('mongodb')
// let dbConnection

// let uri='mongodb+srv://swastikk:swas123@cluster0.e4ofp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// module.exports={
//     connectToDb: (cb)=>{
//         MongoClient.connect(uri)
//         .then((client)=>{
//             dbConnection=client.db()
//             return cb()
//         })
//         .catch(err=>{
//             console.log(err)
//             return cb(err)
//         })
//     },
//     getDb:()=>dbConnection
// }

const mongoose = require('mongoose');

const uri = 'mongodb+srv://swastikk:swas123@cluster0.e4ofp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToDb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Add this option to avoid deprecation warning
            // useFindAndModify: false // Add this option to avoid deprecation warning
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to be handled in the calling code
    }
};

const getDb = () => mongoose.connection;

module.exports = {
    connectToDb,
    getDb
};
