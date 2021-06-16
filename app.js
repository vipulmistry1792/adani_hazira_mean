require('rootpath')();
const express      = require('express');
const app          = express();
const cors         = require('cors');
const bodyParser   = require('body-parser');
const jwt          = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');
const path         = require('path');
const mqtt         = require('./mqtt_data.js');
//const mqtt1         = require('./mqtt_mysql');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//set static folder 
app.use(express.static(path.join(__dirname, 'static')));
// use JWT auth to secure the api
app.use(jwt());
// api routes
app.use('/users', require('./users/user.controller'));
// api routes
app.use('/data', require('./mysql_mqtt/mysql_data.controller'));
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
