const bookService = require("../services/bookService");

const getBooks = (req, res) => {
  const { minPrice } = req.query;

  bookService.getBooks(minPrice, (err, books) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    res.status(200).json(books);
  });
};

const getBookById = (req, res) => {
  bookService.getBookById(req.params.id, (err, book) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  });
};

const createBook = (req, res) => {
  bookService.createBook(req.body, (err, book) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    res.status(201).json(book);
  });
};

const updateBook = (req, res) => {
  bookService.updateBook(req.params.id, req.body, (err, book) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  });
};

const deleteBook = (req, res) => {
  bookService.deleteBook(req.params.id, (err, deleted) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    if (!deleted) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(204).send();
  });
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};