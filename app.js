//console.log('im here');

// We are adding books

// Book Class: Represents a Book
class Book {
  constructor(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
} 

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));  
    //// const StoragedBooks = [
    ////   {
    ////     title: 'Book One',
    ////     author: 'John Doe',
    ////     isbn: '3434434'
    ////   },
    ////   {
    ////     title: 'Book Two',
    ////     author: 'John Doe',
    ////     isbn: '45545'
    ////   } 
    //// ];
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
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
  
  //// How this should be formatted. <div class="alert alert-success">what ever the message is</div>
  static showAlert(message, className) {
    const div = document.createElement('div'); //console.log(div); 
    // Then we give that div a class name
    div.className = `alert-${className}`;
    // Then we add the text
    div.appendChild(document.createTextNode(message));
    const container = document.getElementById('container'); //console.log(container);
    const form = document.getElementById('book-form'); //console.log(form);
    container.insertBefore(div, form)
    
    // Vanish in 3 sec
    ////setTimeout(() => document.querySelector('.alert-danger').remove(), 3000);
    setTimeout(() => document.querySelector('.alert-success').remove(), 1000);

    return 'static method has been called.'; 
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = ''; 
  }

} //console.log(UI.showAlert());
// console.log(deleteBook());

// Store Class: Handles Storage

////We need 3 differant methods and we make them static so we can call them directly
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


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks); 

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit 
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value; 
  const author = document.querySelector('#author').value; 
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === ''){
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn); //console.log(book);
  
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

// Event: Remove a Book.
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove Book from UI
  UI.deleteBook(e.target);

  //// we need to target isbn
  //// So we get the link it self that we click. then we get parent element which is the <td></td>. 
  //// then i grap the previousElementSibling. then we want the text content. this should give us the isbn 
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message when book is added
  UI.showAlert('Book Removed', 'success');
});


