var bookController = function(Book){
  var post = function(req,res){
    // from bookRoutes.js

    // new mongoose instance
    var book = new Book(req.body);

    // for Testing: if no title send 400
    if(!req.body.title){
      res.status(400);
      res.send("Title is required");
    } else {

      // save in mongodb
      book.save();

      // client gets the response from server and status code
      res.status(201).send(book);
    }
  };

  var get = function(req,res){
    // from bookRoutes.js

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

      if(err){
        // split res cos of testing
        res.status(500);
        res.send(err);
      } else {
        // res.json(books);
        // HATEOS, .links to help users to navigate API
        var returnBooks = [];
        books.forEach(function(element, index, array){
          // create new model to not modify mongoose models, .toJSON strips out Mongoose
            var newBook = element.toJSON();
            newBook.links= {};
            newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
            returnBooks.push(newBook);
        });

        res.json(returnBooks);

      }
    });


  };

  // Revealing module pattern, return getters from controller
  return {
    post:post,
    get:get
  };

};

module.exports = bookController;
