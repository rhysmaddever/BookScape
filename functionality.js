// Functionality.js

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
    this.saveToJSONFile();
  }

  findBookById(bookId) {
    return this.books.find(book => book.bookId === bookId);
  }

  saveToJSONFile() {
    const jsonString = JSON.stringify(this.books);
    const blob = new Blob([jsonString], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'books.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  loadFromJSONFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.books = data.map(book => 
            new Book(book.bookId, book.title, book.author, book.genre)
          );
          displayBooks();
          displayReviews();
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  loadFromJSON() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    this.books = storedBooks.map(
      book => {
        const newBook = new Book(book.bookId, book.title, book.author, book.genre);
        newBook.reviews = book.reviews || []; // Restore reviews
        return newBook;
      }
    );
  }
}

// Initialize BookManager
const bookManager = new BookManager();
bookManager.loadFromJSON();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Book form submitted");
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const genre = document.getElementById("book-genre").value.trim();

    if (title && author && genre) {
      console.log("Valid book data entered");
      const newBook = new Book(Date.now().toString(), title, author, genre);
      bookManager.addBook(newBook);

      // Update UI
      updateBookDropdown();
      displayBooks();
      e.target.reset();
    } else {
      console.error("Invalid book data");
      alert("Please fill in all fields to add a book.");
    }
  });

  document.getElementById("review-form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Review form submitted");
    const bookId = document.getElementById("select-book").value;
    const rating = parseInt(document.getElementById("review-rating").value, 10);
    const comment = document.getElementById("review-comment").value.trim();

    if (bookId && rating >= 1 && rating <= 5 && comment) {
      console.log("Valid review data entered");
      const book = bookManager.findBookById(bookId);
      const newReview = new Review("user123", bookId, rating, comment);
      book.reviews.push(newReview);

      // Save updated book data
      bookManager.saveToJSONFile();

      // Update UI
      displayReviews();
      displayBooks();
      e.target.reset();
    } else {
      console.error("Invalid review data");
      alert("Please complete all fields and provide a valid rating (1-5).");
    }
  });

  // Add button to load books from file
  const loadButton = document.createElement('button');
  loadButton.textContent = 'Load Books from File';
  loadButton.onclick = () => bookManager.loadFromJSONFile();
  document.body.appendChild(loadButton);

  // Initial UI Load
  displayReviews();
});

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
  bookList.innerHTML = ""; // Clear previous content
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
  reviewList.innerHTML = ""; // Clear previous content
  bookManager.books.forEach(book => {
    book.reviews.forEach(review => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${book.title}</strong> - Rating: ${review.rating}/5 <br>
        "${review.comment}" <br>
        <small>Reviewed on ${new Date(review.date).toLocaleDateString()}</small>
      `;
      reviewList.appendChild(li);
    });
  });
}
