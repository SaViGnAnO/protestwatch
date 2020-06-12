const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const config = require('./config');

const streams = require('./routes/api/streams');

// BodyParser Middleware
app.use(bodyParser.json());

//Connect to mongo
mongoose.connect(config.mongoURI)
    .then(() => console.log('Mongodb connected.'))
    .catch(err => console.log(err));

    app.use('/api/streams', streams);

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));