var should = require('should'),
sinon = require('sinon');

describe('Book Ctrl Test', function(){
  describe('Post', function(){
    it('should not allow empty title on post', function(){

      // mock book object
      var Book = function(book){
        this.save = function(){};
      };

      var req = {
        body: {
          author: 'Me'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req,res);

    // should return 400, res.status.args["no of times called"]["what status was received"]
      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);

    });
  });
});
