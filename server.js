const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const config = require('./config');

const streams = require('./routes/api/streams');

var allowedOrigins = ['http://localhost:3000',
                      'http://protestwatch.live',
                      'http://www.protestwatch.live'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// BodyParser Middleware
app.use(bodyParser.json());

//Connect to mongo
mongoose.connect(config.mongoURI)
    .then(() => console.log('Mongodb connected.'))
    .catch(err => console.log(err));

    app.use('/api/streams', streams);

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));