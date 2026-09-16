const {
  getBooksFromDatabase,
  saveBooksToDatabase,
} = require("../database/bookDatabase");

const getBooks = (minPrice, callback) => {
  getBooksFromDatabase((err, books) => {
    if (err) {
      return callback(err, null);
    }

    if (minPrice) {
      const minimumPrice = Number(minPrice);
      const filteredBooks = books.filter(
        (book) => book.price >= minimumPrice
      );

      return callback(null, filteredBooks);
    }

    callback(null, books);
  });
};

const getBookById = (id, callback) => {
  getBooksFromDatabase((err, books) => {
    if (err) {
      return callback(err, null);
    }

    const book = books.find((book) => book.id === Number(id));
    callback(null, book);
  });
};

const createBook = (bookData, callback) => {
  getBooksFromDatabase((err, books) => {
    if (err) {
      return callback(err, null);
    }

    const newBook = {
      id: books.length + 1,
      title: bookData.title,
      author: bookData.author,
      price: bookData.price,
      category: bookData.category,
      available: bookData.available,
    };

    books.push(newBook);

    saveBooksToDatabase(books, (err) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, newBook);
    });
  });
};

const updateBook = (id, bookData, callback) => {
  getBooksFromDatabase((err, books) => {
    if (err) {
      return callback(err, null);
    }

    const index = books.findIndex(
      (book) => book.id === Number(id)
    );

    if (index === -1) {
      return callback(null, null);
    }

    const updatedBook = {
      ...books[index],
      ...bookData,
    };

    books[index] = updatedBook;

    saveBooksToDatabase(books, (err) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, updatedBook);
    });
  });
};

const deleteBook = (id, callback) => {
  getBooksFromDatabase((err, books) => {
    if (err) {
      return callback(err, null);
    }

    const index = books.findIndex(
      (book) => book.id === Number(id)
    );

    if (index === -1) {
      return callback(null, false);
    }

    books.splice(index, 1);

    saveBooksToDatabase(books, (err) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, true);
    });
  });
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};