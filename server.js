const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const config = require('./config');

app.use(cors({ origin: "*" }));

// BodyParser Middleware
app.use(express.json());

//Connect to mongo
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => console.log('Mongodb connected.'))
      .catch(err => console.log(err));


// Routes
app.use('/api/streams', require('./routes/api/streams'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));