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
    const StoragedBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '3434434'
      },
      {
        title: 'Book Two',
        author: 'John Doe',
        isbn: '45545'
      } 
    ];

    const books = StoragedBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.title}</td>
      <td><a href="#" class="delete-btn">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete-btn')) {
      el.parentElement.parentElement.remove();
    }
  }
  // NOT WORKING
  
  //I think there is something wrong with the static showAlert.
  //// How this should be formatted. <div class="alert alert-success">what ever the message is</div>
  static showAlert(message, className) {
    // So we create new div
    const div = document.createElement('div'); //console.log(div); 

    // Then we give that div a class name
    div.className = `alert-${className}`;
    // Then we add the text
    div.appendChild(document.createTextNode(message));
    
    const container = document.getElementById('container'); //console.log(container);
    // then we get the form element
    const form = document.getElementById('book-form'); //console.log(form);
    // then we insert the alert in there
    container.insertBefore(div, form)

    return 'static method has been called.'; 
  }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = ''; 
  }

} console.log(UI.showAlert());

// Store Class: Handles Storage

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
    //alert('Please fill in all fields');
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn); //console.log(book);
  
    // Add Book to UI
    UI.addBookToList(book);

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book.
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target)
}); 