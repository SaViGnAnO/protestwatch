const dotenv = require('dotenv');
dotenv.config();

const baseUrl =
    window.location.href.indexOf('localhost') > -1
        ? 'http://localhost:5000'
        : 'http://protestwatch.live:5000';

module.exports = {
    BASE_URL: baseUrl,
};
