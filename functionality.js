// Simulated JSON data
let books = [];

// Add book functionality
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const rating = document.getElementById('rating').value;
  const review = document.getElementById('review').value;

  const newBook = { title, author, rating, review };
  books.push(newBook);

  // Update the display
  displayBooks();

  // Reset form
  e.target.reset();

  // Simulate JSON output to a flat file (in console for now)
  console.log('JSON Output:', JSON.stringify(books));
});

// Display books dynamically
function displayBooks() {
  const booksList = document.getElementById('books');
  booksList.innerHTML = ''; // Clear the list first

  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${book.title} by ${book.author}</span>
      <div>
        <span>Rating: ${book.rating}/5</span>
        <button onclick="deleteBook(${index})">Delete</button>
      </div>
    `;
    booksList.appendChild(li);
  });
}

// Delete book functionality
function deleteBook(index) {
  books.splice(index, 1);
  displayBooks();
}

// Simulate JSON input from a flat file
function loadSampleBooks() {
  const sampleBooks = [
    { title: '1984', author: 'George Orwell', rating: 5, review: 'A must-read classic.' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', rating: 4, review: 'A delightful adventure.' }
  ];

  books = sampleBooks;
  displayBooks();

  console.log('Loaded JSON Input:', JSON.stringify(sampleBooks));
}

// Load sample books on page load
loadSampleBooks();
