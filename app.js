var express = require('express'),
mongoose = require('mongoose'),

// for post
bodyParser = require('body-parser');

// remember to mongod
var db = mongoose.connect('mongodb://localhost/bookAPI');
// create new file for model < schema (~ col headers)
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

// body parser to process json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// for /api/* . /api does not exist
app.use('/api', bookRouter);

// for /api/Books route
bookRouter.route('/Books')
.post(function(req, res){

    // new mongoose instance
    var book = new Book(req.body);

    // save in mongodb
    book.save();

    // client gets the response from server and status code
    res.status(201).send(book);

})

.get(function(req,res){
  // previously
  // var response = { HI: 'this is my api'};
  // res.json(response);

  // I copied the file into dir and did:
  // $ mongo bookAPI < booksJson.js
  // can see in robomongo

  // pass filter var into first arg of Model.find
  var query = {};
  if(req.query.genre)
  {
    query.genre = req.query.genre;
  }


  Book.find(query, function(err,books){

    if(err)
    res.status(500).send(err);
    else
    res.json(books);
  });

});


bookRouter.route('/Books/:bookId')
.get(function(req,res){

  Book.findById(req.params.bookId, function(err,book){
    if(err)
    res.status(500).send(err);
    else
    res.json(book);
  });
});

app.get('/', function(req,res){
  res.send('welcome to my api');

});

app.listen(port, function(){
  console.log("on 3000");
});
