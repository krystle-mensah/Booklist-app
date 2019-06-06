
// BOOK CLASS: Represents a Book
class Book {
  constructor(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
} 

// UI CLASS: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));  
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="isbn-data">${book.isbn}</td>
      <td><a href="#" class="delete-btn">X</a></td>
    `;
    list.appendChild(row);
  }
  
  static deleteBook(el) {
    if (el.classList.contains('delete-btn')) {
      el.parentElement.parentElement.remove();
    }
    return 'This is static delete book';
  } 
  
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.getElementById('container'); 
    const form = document.getElementById('book-form');
    container.insertBefore(div, form)
    
    setTimeout(() => document.querySelector('.alert-success').remove(), 1000);

    return 'static method has been called.'; 
  }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = ''; 
  }
} 

// STORE CLASS: Handles Storage
class Store {
  static getBooks() {
    let books;

    if(localStorage.getItem('books') === null){
      books = [];
    }else
    books = JSON.parse(localStorage.getItem('books'));

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book); 
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}


// EVENTS: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks); 

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value; 
  const author = document.querySelector('#author').value; 
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === ''){
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate Book
    const book = new Book(title, author, isbn);
  
    // Add Book to UI
    UI.addBookToList(book);

    // Add Book to store
    Store.addBook(book);

    // Show success message when book is added
    UI.showAlert('Book added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  
  // Remove Book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.parentElement.querySelector('.isbn-data').textContent);

  // Show success message when book is added
  UI.showAlert('Book Removed', 'success');
}); 

