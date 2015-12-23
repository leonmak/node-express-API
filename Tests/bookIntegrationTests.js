var should = require('should'),
    request = require('supertest'),

    // agent will use app to do http calls
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    //take model from mongoose
    // agent executes http calls
    agent = request.agent(app);


describe('Book Crud Test', function(){
    it('Should allow a book to be posted and return a read and _id', function(done){
        var bookPost = {title:'new Book', author:'Jon', genre:'Fiction'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function(err, results){
              // see if default false value applied on read key, and have unique id.
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done(); // move on
            });
    });

// once all test done, clear database
    afterEach(function(done){
        Book.remove().exec();
        done();
    });
});
