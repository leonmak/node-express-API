var express = require('express');


var routes = function(Book){

  // from app.js

  var bookRouter = express.Router();

  // cut out all verbs into a controller.js
  var bookController = require('../Controllers/bookController')(Book);

  // for /api/Books route
  bookRouter.route('/')

  // cut out all verbs into a controller.js
  .post(bookController.post)
  .get(bookController.get);


  // Middleware
  // so we don't have to keep doing Book.findById..
  bookRouter.use('/:bookId', function(req,res, next){
    // next arg: if no middleware move on to verbs
    Book.findById(req.params.bookId, function(err,book){
      if(err)
      res.status(500).send(err);
      else if(book){
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
  .get(function(req,res){

    // use Middleware, req.book set in middleware
    res.json(req.book);
  })
  // put
  .put(function(req,res){
    // now book is req.book (from midlleware)
    // req.body is from put request
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;

    // pass cb in .save for async code
    // not req.book.save(); res.json(req.book)
    req.book.save(function(err){
      if(err)
      res.status(500).send(err);
      else{
        res.json(req.book);
      }
    });
  })
  .patch(function(req,res){
    // we don't want to update _id, so del the received id
    if(req.body._id)
    delete req.body._id;
    // , only change received fields
    // for key in received object
    for(var p in req.body)
    {
      req.book[p] = req.body[p];
    }

    req.book.save(function(err){
      if(err)
      res.status(500).send(err);
      else{
        res.json(req.book);
      }
    });
  })
  // Testing in postman: set Content-type to application/json
  .delete(function(req,res){
    req.book.remove(function(err){
      if(err)
      res.status(500).send(err);
      else{
        res.status(204).send('Removed');
      }
    });
  })
  ;
  // end from app.js

  return bookRouter;
};

module.exports = routes;
