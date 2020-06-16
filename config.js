const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    youtubeKey: process.env.YOUTUBE_APIKEY,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
};