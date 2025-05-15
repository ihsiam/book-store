// Controller import
const { GetBooks, UploadBook, UpdateBook, DeleteBook, getBookData, getBookDataByAdmin  } = require("../controllers/bookRouteController");
const auth = require("../middleware/auth");

// Book router define
const bookRouter = require("express").Router();

// Get all books
bookRouter.get('/allBooks', GetBooks);

// Upload book
bookRouter.post('/uploadBook',auth, UploadBook);

// get a book
bookRouter.get('/book/:id', getBookData);

bookRouter.get('/adminBook/:id', getBookDataByAdmin);

// Update a book
bookRouter.patch('/book/:id',auth, UpdateBook);

// Delete a book
bookRouter.delete('/book/:id',auth, DeleteBook);

// Nodule export
module.exports = bookRouter;