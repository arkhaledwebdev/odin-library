const myLibrary = [];
let index = 0;

// hooks 
const addBookButton = document.getElementById("add-book-button");
const dialogAddBook = document.getElementById("dialog-add-book");
const confirmDialog = document.getElementById("confirmButton");
const cancelDialog = document.getElementById("cancelButton");
const formBookName = document.getElementById("form-book-name");
const formBookAuthor = document.getElementById("form-book-author");
const formBookPages = document.getElementById("form-book-pages");
const formBookSynopsis = document.getElementById("form-book-synopsis");
const formBookReadCheck = document.getElementById("form-book-readCheck");
const mainContent = document.getElementById("main-content");
const addBookForm = document.getElementById("form-add-book");

const totalBooks = document.getElementById('books-value');
const readBooks = document.getElementById('readBooks-value');
const unReadBooks = document.getElementById('unreadBooks-value');



class Book {
    constructor(name, author, pages, synopsis, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.synopsis = synopsis;
        this.isRead = isRead;
    }
};

function addBookToLibrary(book) {

    myLibrary.push(book);
    createBookItem(book, index);
    index++;
};

function createBookItem(newBook, newIndex) {
    const newBookItem = document.createElement('div');
    newBookItem.classList.add('book-item');
    newBookItem.dataset.index = newIndex;
    mainContent.appendChild(newBookItem);

    // book name
    const newBookName = document.createElement('div');
    newBookName.classList.add('book-name');
    newBookName.textContent = newBook.name;
    newBookItem.appendChild(newBookName);

    // book author
    const newBookAuthor = document.createElement('div');
    newBookAuthor.classList.add('book-author');
    const newAuthorTitle = document.createElement('div');
    newAuthorTitle.classList.add('book-author-title');
    newAuthorTitle.textContent = "Author: "
    const newAuthorValue = document.createElement('div');
    newAuthorValue.classList.add('book-author-value');
    newAuthorValue.textContent = newBook.author;
    newBookAuthor.appendChild(newAuthorTitle);
    newBookAuthor.appendChild(newAuthorValue);
    newBookItem.appendChild(newBookAuthor);

    // book Pages
    const newBookPages = document.createElement('div');
    newBookPages.classList.add('book-pages');
    const newPagesTitle = document.createElement('div');
    newPagesTitle.classList.add('book-pages-title');
    newPagesTitle.textContent = "Pages: "
    const newPagesValue = document.createElement('div');
    newPagesValue.classList.add('book-pages-value');
    newPagesValue.textContent = newBook.pages;
    newBookPages.appendChild(newPagesTitle);
    newBookPages.appendChild(newPagesValue);
    newBookItem.appendChild(newBookPages);

    // book Synopsis
    const newBookSynopsis = document.createElement('div');
    newBookSynopsis.classList.add('book-synopsis');
    const newSynopsisTitle = document.createElement('div');
    newSynopsisTitle.classList.add('book-synopsis-title');
    newSynopsisTitle.textContent = "Synopsis: "
    const newSynopsisValue = document.createElement('div');
    newSynopsisValue.classList.add('book-synopsis-value');
    newSynopsisValue.textContent = newBook.synopsis;
    newBookSynopsis.appendChild(newSynopsisTitle);
    newBookSynopsis.appendChild(newSynopsisValue);
    newBookItem.appendChild(newBookSynopsis);

    // book footer
    const newBookFooter = document.createElement('div');
    newBookFooter.classList.add('book-footer');
    const readStatus = document.createElement('div');
    readStatus.classList.add('read-status');
    readStatus.dataset.index = newIndex;
    console.log(newBook.isRead);
    newBookFooter.appendChild(readStatus);

    const newBookButtons = document.createElement('div');
    newBookButtons.classList.add('book-buttons');
    const newButtonRead = document.createElement('button');
    newButtonRead.classList.add('button-read');
    newButtonRead.dataset.index = newIndex;
    
    const newButtonDelete = document.createElement('button');
    newButtonDelete.classList.add('button-delete');
    newButtonDelete.textContent = "Delete"
    newButtonDelete.dataset.index = newIndex;
    newBookButtons.appendChild(newButtonRead);
    newBookButtons.appendChild(newButtonDelete);
    newBookFooter.appendChild(newBookButtons);
    newBookItem.appendChild(newBookFooter);

    if (newBook.isRead == true) {
        readStatus.textContent = 'You have read this book';
        newButtonRead.textContent = "Unread";
        newButtonRead.classList.add('unread-book')
    }
    else {
        readStatus.textContent = 'You have not read this book yet';
        newButtonRead.textContent = "Read";
        newButtonRead.classList.remove('unread-book')
    }
    
    calculateBooks();

    newButtonDelete.addEventListener('click', (e) => {
        console.log(e.target);
        let deleteIndex = e.target.dataset.index;
        let itemToRemove = document.querySelector(`.book-item[data-index="${deleteIndex}"]`);
        console.log(itemToRemove);
        itemToRemove.remove();
        calculateBooks();
    });

    newButtonRead.addEventListener('click', (e) => {
        let readIndex = e.target.dataset.index;
        let itemToRead = document.querySelector(`.read-status[data-index="${readIndex}"]`);
        let buttonToRead = document.querySelector(`.button-read[data-index="${readIndex}"]`);
        if (itemToRead.textContent === 'You have read this book') {
            itemToRead.textContent = 'You have not read this book yet';
            buttonToRead.textContent = 'Read';
            buttonToRead.classList.remove('unread-book')
        }
        else {
            itemToRead.textContent = 'You have read this book';
            buttonToRead.textContent = 'Unread';
            buttonToRead.classList.add('unread-book')

        }
        calculateBooks();
    })

}

addBookButton.addEventListener('click', () => {
    dialogAddBook.showModal();
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let book = new Book(
        formBookName.value,
        formBookAuthor.value,
        formBookPages.value,
        formBookSynopsis.value,
        formBookReadCheck.checked
    );

    addBookToLibrary(book);
    dialogAddBook.close();

})

cancelDialog.addEventListener('click', (e) => {
    e.preventDefault()
    dialogAddBook.close();
})


function calculateBooks() {

    let readBooksValue = 0;
    let unReadBooksValue = 0;

    let bookButtons = document.querySelectorAll('.button-read');

    bookButtons.forEach(button => {
        if (button.textContent === "Read") {
            unReadBooksValue++;
        }

        if (button.textContent === "Unread") {
            readBooksValue++;
        }
    })


    totalBooks.textContent = bookButtons.length - 1;
    readBooks.textContent = readBooksValue;
    unReadBooks.textContent = unReadBooksValue;
}


