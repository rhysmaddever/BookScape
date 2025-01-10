// Core Classes
class Book {
  constructor(id, title, author, genre) {
    this.bookId = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.reviews = [];
  }

  getAverageRating() {
    if (this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / this.reviews.length).toFixed(1);
  }
}

class Review {
  constructor(userId, bookId, rating, comment) {
    this.reviewId = Date.now().toString();
    this.userId = userId;
    this.bookId = bookId;
    this.rating = rating;
    this.comment = comment;
    this.date = new Date();
  }
}

class BookManager {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.saveToJSON();
  }

  findBookById(bookId) {
    return this.books.find(book => book.bookId === bookId);
  }

  saveToJSON() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  loadFromJSON() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    this.books = storedBooks.map(
      book => new Book(book.bookId, book.title, book.author, book.genre)
    );
  }
}

// Initialize BookManager
const bookManager = new BookManager();
bookManager.loadFromJSON();
updateBookDropdown();
displayBooks();

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const genre = document.getElementById("book-genre").value;

  const newBook = new Book(Date.now().toString(), title, author, genre);
  bookManager.addBook(newBook);

  updateBookDropdown();
  displayBooks();
  e.target.reset();
});

document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const bookId = document.getElementById("select-book").value;
  const rating = parseInt(document.getElementById("review-rating").value, 10);
  const comment = document.getElementById("review-comment").value;

  const book = bookManager.findBookById(bookId);
  const newReview = new Review("user123", bookId, rating, comment);
  book.reviews.push(newReview);

  bookManager.saveToJSON();
  displayReviews();
  displayBooks();
  e.target.reset();
});

// Display Functions
function updateBookDropdown() {
  const dropdown = document.getElementById("select-book");
  dropdown.innerHTML = '<option value="" disabled selected>Select a Book</option>';
  bookManager.books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.bookId;
    option.textContent = book.title;
    dropdown.appendChild(option);
  });
}

function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  bookManager.books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br>
      Genre: ${book.genre} | Average Rating: ${book.getAverageRating()}
    `;
    bookList.appendChild(li);
  });
}

function displayReviews() {
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";
  bookManager.books.forEach(book => {
    book.reviews.forEach(review => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${book.title}</strong> - Rating: ${review.rating}/5 <br>
        "${review.comment}" <br>
        <small>Reviewed on ${review.date.toLocaleDateString()}</small>
      `;
      reviewList.appendChild(li);
    });
  });
}
