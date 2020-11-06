//Book Class: Represents a Book
class Book {
    constructor(title, author, isbn){
        this.title = title
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: Handle UI task
class UI {
    static displayBooks(){
        const StoredBooks = [
            {
            title: 'Book One',
            author: 'John doe',
            isbn: '2323e3'
        },
        {
            title: 'Book Two',
            author: 'Mike John ',
            isbn: '116578'
        }
       ];

       const books = StoredBooks;

       books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.quesrySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><ahref="#" class="btn btn-danger btn-sm
        delete">X</td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            /* The parent element is td and we want the whole book row so
            we take the parent of the parent which is tr */
        }
    }

    static showAlert(Message,classname){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

// clears input fields
    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


// Store Class: Handles Storage
class Store {
    getBooks() {
         let books;
         if(localStorage.getItem('books') === null) {
             books = [];
         } else{
             books = JSON.parse(localStorage.getItem('books'));
         }
    }
    
    addBook(book) {
        const books = Store.getBooks();

        books.push(books);

        localStorage.setItem('books', JSON.stringify(books));
    }

    removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
    }
}

// Event: Display Books
document.addEventListener('DomContentLoaded', UI.displayBooks);

//Event:Add a book
document.querySelector('#book-form').addEventListener('click' , (e) => { // event listener for Submit
   
    // Prevent actual submit
    e.preventDefault();

        //Get form values
    const title = document.querySelector('#title').value; // gets title value aka the input
    const author = document.querySelector('#author').value; // gets author value aka the input
    const isbn = document.querySelector('#isbn').value; // gets isbn value aka the input

    //Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instantuate Book
    const book = new Book(title, author, isbn);

    //Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert('Book added', 'success');

    // Clear fields(the input boxes)
    UI.clearfields();
    }

    
});

//Event:Remove a Book
document.querySelector('#book-list').addEventListener('click' , (e) => {
    UI.deleteBook(e.target);
    // Show success message
    UI.showAlert('Book Removed', 'success');
});

