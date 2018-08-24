const redis = require('redis');
//(port, host) by default 6379, 127.0.0.1
const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', () => {
  console.log(`Something went wrong ${error}`);
});

module.exports = client;
