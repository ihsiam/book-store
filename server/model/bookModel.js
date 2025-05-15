// dependencies
const { model, Schema, default: mongoose } = require('mongoose');

// schema
const BookSchema = new Schema({
    bookTitle: {
        type: String,
        required: true,
    },
    authorName:{
        type: String,
        required : true,
    },
    imageURL:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    bookPDFURL : {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: false,
    },
    adminId : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Admin',
        },
    ],
});

// model
const Book = model('Books', BookSchema);

// export
module.exports = Book;
