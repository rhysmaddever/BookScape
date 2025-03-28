import { importBooks } from './utils.js';
import { exportBooks } from './utils.js';
import bookData from './bookData.js';

let allBooks = JSON.parse(bookData);

function addBook(book) {
  allBooks.books.push(book);
}

function removeBook(isbn) {
  allBooks.books = allBooks.books.filter(book => book.isbn !== isbn);
}

function updateBook(isbn, updates) {
  const index = allBooks.books.findIndex(b => b.isbn === isbn);
  if (index !== -1) {
    Object.assign(allBooks.books[index], updates);
  }
}

function getBook(isbn) {
  return allBooks.books.find(book => book.isbn === isbn);
}

export { addBook, removeBook, updateBook, getBook };
