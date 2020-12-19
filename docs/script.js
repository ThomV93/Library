let myLibrary = [];
const cardContainer_div = document.getElementById("card-container");
const cardCreator_div = document.getElementById("card-creator");
const bookNum_span = document.getElementById("book-num");
const completedBookNum_span = document.getElementById("completed-book-num");
const totalPageNum_span = document.getElementById("total-page-num");
const totalCompletedPageNum_span = document.getElementById("total-completed-page-num");


function library() {
};

library.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + ", " + this.read;
};

function book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

book.prototype = Object.create(library.prototype);

function addBookToLibrary(obj){
    myLibrary.push(obj);
};

function displayBooks() {
    myLibrary.forEach(item => {
        let card = 
        `
        <div class="card">
            <div class="card-info">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-author">${item.author}</p>
                <p><span class="pages-read-num">${item.pages}</span> of <span class="all-pages-num">${item.pages}</span> pages</p>
                <div id="switch-container">
                    <p>Read</p>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="card-btn-container">
                <button id="edit-btn" type="button">Edit</button>
                <button id="delete-btn" type="button">Delete</button>
            </div>
        </div>
        `;
        cardContainer_div.innerHTML += card;
    });
};

function displayData() {
    bookNum_span.innerHTML = myLibrary.length;
};







const book1 = new book("Bend Sinister", "Nabakov", "450", "not read yet");
const book2 = new book("1984", "Orwell", "350", "read");

addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks();
displayData();

  