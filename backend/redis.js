// const redis = require('redis');
// const { promisify } = require('util');
// console.log("here");

// // Create Redis client
// const redisClient = redis.createClient({
//     // Specify Redis connection options if needed
//     // For example:
//     host: 'localhost',
//     port: 6379,
// });

// const getAsync = promisify(redisClient.get).bind(redisClient);
// const setAsync = promisify(redisClient.set).bind(redisClient);

// // redisClient.connect((err) => {
// //     if (err) {
// //         console.error('Failed to connect to Redis:', err);
// //     } else {
// //         console.log('Connected to Redis serversssss');
// //     }
// // });

// // Log Redis connection status
// redisClient.on('connect', () => {
//     console.log('Connected to Redis server');
// });

// // Log Redis errors
// redisClient.on('error', (error) => {
//     console.error('Redis error:', error);
// });

// module.exports = { redisClient, getAsync, setAsync };

const Redis = require('ioredis');
const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

// Promisify the get and set methods of the Redis client
const { promisify } = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
const lpushAsync=promisify(redisClient.lpush).bind(redisClient);
const lsetAsync=promisify(redisClient.lset).bind(redisClient);
// rpushAsync
const rpushAsync=promisify(redisClient.rpush).bind(redisClient);
module.exports = { redisClient, getAsync, setAsync,lrangeAsync ,rpushAsync,lpushAsync,lsetAsync};
