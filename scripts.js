const myLibrary = [];
const addBookButton = document.getElementById("add-book-button");
const dialogAddBook = document.getElementById("dialog-add-book");
const confirmDialog = document.getElementById("confirmButton");
const formBookName = document.getElementById("form-book-name");
const formBookAuthor = document.getElementById("form-book-author");
const formBookPages = document.getElementById("form-book-pages");
const formBookSynopsis = document.getElementById("form-book-");
const formBookReadCheck = document.getElementById("form-book-readCheck");

function Book(name, author, pages, synopsis) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.synopsis = synopsis;
};

function addBookToLibrary(book) {

};

addBookButton.addEventListener('click', () => {
    dialogAddBook.showModal();
});


confirmDialog.addEventListener('click', (event) => {
    event.preventDefault();

    let book = new Book(
        formBookName.value,
        formBookAuthor.value,
        formBookPages.value,
        formBookName.value,
        formBookName.value,
    )

});