var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: {
        type: String
    },
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
// default means if the read field not stated it will add it as false
});

// compile schema into model with 'name' ppty 'Book', can see name in robomongo
module.exports= mongoose.model('Book', bookModel);
