const router = require("express").Router();
const Book = require("../models/bookModel");

//add book

router.post("/addBook", async (req, res) => {
  try {
     console.log("Received Data:", req.body);
     const newBook = new Book(req.body);
     await newBook.save();
     return res.send({ success: true, message: "Book added successfully" });
  } catch (error) {
     console.error("MongoDB Error:", error);
     return res.send({ success: false, message: error.message });
  }
});

//update a book
router.put("/updateBook/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Book updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//delete a book
router.delete("/deleteBook/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//retrieve all books
router.get("/getAllBooks", async (req, res) => {
  try {
    const books = await Book.find();
    return res.send({ success: true, data: books });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//retrieve a books
router.get("/getBookById/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.send({ success: true, data: book });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
module.exports = router;
