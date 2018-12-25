const http = require('http');
const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');

// app
const app = express();

// http
const httpServer = http.createServer(app);

// token
const secret = 'suibianxiexie';
const token = jwt.sign({username: '1123486116@qq.com'}, secret, {expiresIn: 60 * 60});

// redis
const configRedis = {
    host: 'localhost',
    port: '6379',
    db: 12,
};
const redisClient = redis.createClient(configRedis);
redisClient.on('connect', function () {
    console.log('redis connection open to:\n', `http://${configRedis.host}:${configRedis.port}`);
    const serverHttp = httpServer.listen('8090', function () {
        console.log('server connection open to:\n', `http://localhost:${serverHttp.address().port}`);
    });
});
redisClient.on('error', function (error) {
    console.log('redis connection error:\n', error);
});
