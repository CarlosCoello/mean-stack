const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const todo = require('./routes/todo')(router);
const cors = require('cors');
const port = process.env.PORT || 3000;
//const todo = require('./routes/todo');

//Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true, }, (err) => {
  if(err){
    console.log('Error on connecting with db');
  } else {
    console.log('connected ' + config.db);
  }
});

//Middleware
app.use( cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use( express.static(__dirname + '/dist') );
app.use('/', todo);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
