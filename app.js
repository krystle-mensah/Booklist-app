//console.log('checking page');

// We are adding books

// Book Class: Represents a Book
class Book {
  // method that runs when we instantiate
  constructor(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
} 

// UI Class: Handle UI Tasks
// Anything in the user enter face, when a book displays or gets removed or we show an alert

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    // Now we wont to loop through all the books in the array then we to call the method add book to list
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
  // This is call add book to list.
  // we create a row to put into the tbody
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    // 'tr'Defines a row in a table
    const row = document.createElement('tr');
    // We use back ticks so we can use variables
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete-btn">X</a></td>
    `;
    // Then we add the togeher
    list.appendChild(row);
  }
  
  static deleteBook(el) {
    // If the element contains a class of delete-btn. if that so 
    if (el.classList.contains('delete-btn')) {
      // element and get the td then the tr and remove the row
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
  // To clear the field we grap the element then the value and set it to an empty string. 
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = ''; 
  }

} //console.log(UI.showAlert());
// console.log(deleteBook());

// STORE CLASS: Handles Storage ******************************** 
// We are using local storage

// We need 3 differant methods and we make them static so we can call them directly
class Store {
  static getBooks() {
    let books;
    // Then we need to check if there is a book in local storage

    if(localStorage.getItem('books') === null){
      books = [];
    }else
    books = JSON.parse(localStorage.getItem('books'));

    return books;
  }

  static addBook(book) {
    // To get the books from local store we say the of class books get them
    const books = Store.getBooks();
    // whatever is pushed on we get the book
    books.push(book);
    // Then we reset it to local storage. books is an array of objects so we us JSON.stringify to change it to a string. 
    localStorage.setItem('books', JSON.stringify(books));
  }
  // We are removing the book by it Isbn because it is uigue.

  static removeBook(isbn) {
    // First we get the books from the store

    const books = Store.getBooks();
    // Then we loop through them

    books.forEach((book, index) => {
    // then we want to check to see if the current book that is being looped through if the isbn matches the one that is 
    // passed in for remove book 
      if(book.isbn === isbn) {
      // then we slice it out of the array. To know where to slice it we have the index. so index and we are only 
      // slicing 1
        books.splice(index, 1);
      }
    });
    // Then we set to local storage
    localStorage.setItem('books', JSON.stringify(books));
  }
}


// Event: Display Books. Which means to show books in a list on the page.

document.addEventListener('DOMContentLoaded', UI.displayBooks); 

// Event: Add a Book
// we waiting for when a user hit's submit
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
    // Instatiate Book
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

// Event: Remove a Book

// Where waiting for the user to click
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove Book from UI
  UI.deleteBook(e.target);

  // we need to target isbn
  // So we get the link it self that we click. then we get parent element which is the <td></td>. 
  // then i grap the previousElementSibling. then we want the text content. this should give us the isbn 
  
  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message when book is added
  UI.showAlert('Book Removed', 'success');
}); 
// the check the event listerner console.log(e.target);

