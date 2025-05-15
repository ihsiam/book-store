// Dependences
const Admin = require('../model/adminModel');
const Book = require('../model/bookModel');
const { ObjectId } = require('mongodb');

// Get all books
exports.GetBooks = async (req, res) =>{
    try {
        // Fetch books
        const books = await Book.find().lean(); // Use .lean() to get plain JS objects
        res.json(books); // Safe to send
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.status(500).json({ error: "Failed to get books", details: error.message });
    }
}


// Upload book
exports.UploadBook = async (req, res) => {
     const adminId = req.id;
     const newbooks = new Book({
                 ...req.body,
                 adminId,
             });
     const result = await newbooks.save();
     const { _id } = newbooks;
     // add todo id into user model
     await Admin.updateOne(
          { _id: adminId },
          {
               $push: {
               books: _id,
               },
               // eslint-disable-next-line comma-dangle
          }
     );
     // response send
     res.send(result);
}


// get a book
exports.getBookData = async (req, res) => {
     // get the id
     const id = req.params.id;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // find from db
     const result = await Book.findOne(filter);
     //response send
     res.send(result);
}


// get adminwise book
exports.getBookDataByAdmin = async (req, res) => {
     try {
        const books = await Book.find({ adminId: req.params.id });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
}


// Update a book
exports.UpdateBook = async (req, res) => {
     // get the id
     const id = req.params.id;
     // get update data 
     const updateData = req.body;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // upsert 
     const options = { upsert: true };
     // set update data
     const updateDoc = {
          $set: {...updateData},
          };
     // update on db
     const result = await Book.updateOne(filter, updateDoc, options);
     // response send
     res.send(result);
}


// Delete a book
exports.DeleteBook = async (req, res) => {
     const adminId = req.id;
     // get the id
     const id = req.params.id;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // delete from db
     const result = await  Book.deleteOne(filter);

     // delete from user model
     await Admin.updateOne(
          { _id: adminId },
          {
               $pull: {
               books: id,
               },
               // eslint-disable-next-line prettier/prettier
          },
     );
     //response send
     res.send(result);
}