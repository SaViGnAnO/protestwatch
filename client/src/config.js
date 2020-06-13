const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    BASE_URL: process.env.BASE_URL || "http://localhost:5000"
};