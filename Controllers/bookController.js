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
      res.status(201);
      res.send(book);
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
        res.status(500);
        res.send(err);
      } else {
        res.json(books);
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
