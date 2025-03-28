<<<<<<< HEAD
// Function to show a pop-up message
function showPopupMessage(message, type = "success") {
  const popup = document.createElement("div");
  popup.className = `popup-message ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
=======
// Functionality.js
>>>>>>> fa1e01e50f4289b7662b5eed413accc2bae4fadd

// Core Classes
class Book {
  constructor(id, title, author, genre, pages = 0, pagesRead = 0, reviews = []) {
    this.bookId = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.reviews = reviews;
  }

  getAverageRating() {
    if (this.reviews.length === 0) return "No reviews yet";
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / this.reviews.length).toFixed(1);
  }

  getProgress() {
    return this.pages > 0 ? ((this.pagesRead / this.pages) * 100).toFixed(1) + "%" : "N/A";
  }
}

class BookManager {
  constructor() {
    this.books = [];
    this.loadFromJSON();
  }

  addBook(book) {
    this.books.push(book);
<<<<<<< HEAD
    this.saveToJSON();
    updateBookDropdown(); // Update dropdown after adding a book
    showPopupMessage("📖 Book added successfully!", "success"); // Show pop-up
    displayBooks(); // Re-display all books
  }

  deleteBook(bookId) {
    this.books = this.books.filter(book => book.bookId !== bookId);
    this.saveToJSON();
    updateBookDropdown();
    displayBooks();
    showPopupMessage("🗑️ Book deleted.", "error"); // Show pop-up
=======
    this.saveToJSONFile();
>>>>>>> fa1e01e50f4289b7662b5eed413accc2bae4fadd
  }

  findBookById(bookId) {
    return this.books.find(book => book.bookId === bookId);
  }

<<<<<<< HEAD
  updateBookProgress(bookId, pages, pagesRead) {
    const book = this.findBookById(bookId);
    if (book) {
      book.pages = pages;
      book.pagesRead = pagesRead;
      this.saveToJSON();
      displayBooks();
      showPopupMessage("📚 Progress updated!", "info"); // Show pop-up
    }
  }

  addReview(bookId, rating, reviewText) {
    const book = this.findBookById(bookId);
    if (book) {
      book.reviews.push({ rating, text: reviewText });
      this.saveToJSON();
      displayBooks();
      showPopupMessage("⭐ Review added!", "success"); // Show pop-up
    }
  }

  saveToJSON() {
    localStorage.setItem("books", JSON.stringify(this.books));
=======
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
>>>>>>> fa1e01e50f4289b7662b5eed413accc2bae4fadd
  }

  loadFromJSON() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    this.books = storedBooks.map(book => new Book(book.bookId, book.title, book.author, book.genre, book.pages, book.pagesRead, book.reviews || []));
  }
}

// Initialize book manager
const bookManager = new BookManager();
<<<<<<< HEAD

// Event Listeners for adding book
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const genre = document.getElementById("book-genre").value.trim();

  if (title && author && genre) {
    const newBook = new Book(Date.now().toString(), title, author, genre);
    bookManager.addBook(newBook);
    e.target.reset();
  } else {
    showPopupMessage("⚠️ Please fill in all fields!", "error");
  }
});

// Event Listeners for deleting book
document.getElementById("delete-book").addEventListener("click", function () {
  const bookId = document.getElementById("select-book").value;
  if (bookId) {
    bookManager.deleteBook(bookId);
  } else {
    showPopupMessage("⚠️ Please select a book to delete!", "error");
  }
});

// Event Listeners for updating book progress
document.getElementById("update-pages-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const bookId = document.getElementById("select-progress-book").value;
  const totalPages = parseInt(document.getElementById("total-pages").value);
  const pagesRead = parseInt(document.getElementById("pages-read").value);

  if (bookId && totalPages > 0 && pagesRead >= 0) {
    bookManager.updateBookProgress(bookId, totalPages, pagesRead);
    e.target.reset();
  } else {
    showPopupMessage("⚠️ Please fill in all fields correctly!", "error");
  }
});

// Event Listeners for adding review
document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const bookId = document.getElementById("select-review-book").value;
  const reviewText = document.getElementById("review-text").value.trim();
  const reviewRating = parseInt(document.getElementById("review-rating").value);

  if (bookId && reviewText && reviewRating >= 1 && reviewRating <= 5) {
    bookManager.addReview(bookId, reviewRating, reviewText);
    e.target.reset();
  } else {
    showPopupMessage("⚠️ Please fill in all fields correctly!", "error");
  }
});

// Update book dropdowns
=======
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

>>>>>>> fa1e01e50f4289b7662b5eed413accc2bae4fadd
function updateBookDropdown() {
  const dropdowns = [document.getElementById("select-book"), document.getElementById("select-progress-book"), document.getElementById("select-review-book")];
  dropdowns.forEach(dropdown => {
    dropdown.innerHTML = '<option value="" disabled selected>Select a Book</option>';
    bookManager.books.forEach(book => {
      const option = document.createElement("option");
      option.value = book.bookId;
      option.textContent = book.title;
      dropdown.appendChild(option);
    });
  });
}

// Display books in the list
function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  bookManager.books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br>
      Genre: ${book.genre} | Pages: ${book.pages} | Progress: ${book.getProgress()} <br>
      Average Rating: ${book.getAverageRating()}
      <ul>
        ${book.reviews.map(review => `<li>⭐ ${review.rating}: ${review.text}</li>`).join("")}
      </ul>
    `;
    bookList.appendChild(li);
  });
}

<<<<<<< HEAD
// Initialize dropdown and book display
updateBookDropdown();
displayBooks();

// Download books as JSON
document.getElementById("download-json").addEventListener("click", function () {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookManager.books, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "books.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
});

// Upload books from JSON
document.getElementById("upload-json").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedBooks = JSON.parse(e.target.result);
        if (Array.isArray(uploadedBooks)) {
          bookManager.books = uploadedBooks.map(book => new Book(book.bookId, book.title, book.author, book.genre, book.pages, book.pagesRead, book.reviews || []));
          bookManager.saveToJSON();
          updateBookDropdown();
          displayBooks();
          showPopupMessage("📂 Books uploaded successfully!", "success");
        } else {
          showPopupMessage("⚠️ Invalid JSON file format!", "error");
        }
      } catch (error) {
        showPopupMessage("⚠️ Error parsing JSON file!", "error");
      }
    };
    reader.readAsText(file);
  }
});
=======
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
>>>>>>> fa1e01e50f4289b7662b5eed413accc2bae4fadd
