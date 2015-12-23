var express = require('express'),
mongoose = require('mongoose'),

// for post
bodyParser = require('body-parser');

// remember to mongod
var db;
// use a different db if env var set to test
if(process.env.ENV==='Test'){
  db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  db = mongoose.connect('mongodb://localhost/bookAPI');
}
// create new file for model < schema (~ col headers)
var Book = require('./models/bookModel');

var app = express();

// cut out bookRouter methods
bookRouter = require('./Routes/bookRoutes.js')(Book);
// (), function call as the file exports a function
// (Book) to inject the model

// body parser to process json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// for /api/* . /api does not exist
app.use('/api/books', bookRouter);


var port = process.env.PORT || 3000;

app.get('/', function(req,res){
  res.send('welcome to my api');

});

app.listen(port, function(){
  console.log("on port " + port);
  console.log(process.env.ENV);

});

// allows supertest to execute the app
module.exports = app;
