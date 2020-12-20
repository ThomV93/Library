const cardContainer_div = document.getElementById("card-container");
const cardCreator_div = document.getElementById("creator-container");
const plus_div = document.getElementById("plus");
const formContainer_div = document.getElementById("form-container");
const bookNum_span = document.getElementById("book-num");
const completedBookNum_span = document.getElementById("completed-book-num");
const totalPageNum_span = document.getElementById("total-page-num");
const totalCompletedPageNum_span = document.getElementById("total-completed-page-num");

//Prototype object
function library() {};

//Add info function to the prototype of library
library.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + ", " + this.read;
};

//Book object constructor
function book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

//Set a copy of library prototype to each book contructed
book.prototype = Object.create(library.prototype);

//Create new book HTML structure for each book in the myLibrary array
function displayBooks() {
    myLibrary.forEach(item => {
        //create card element
        let bookCard = document.createElement("div");
        bookCard.className = "card";
    
    
        //card info section
        let cardInfo = document.createElement("div");
        cardInfo.className = "card-info";
    
        let cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = item.title;
    
        let cardAuthor = document.createElement("p");
        cardAuthor.className = "card-author";
        cardAuthor.innerHTML = item.author;
    
        let cardPagesNum = document.createElement("p");
        cardPagesNum.innerHTML = item.pages + " pages";
    
    
        //switch checkbox
        //outer section
        let cardSwitchContainer = document.createElement("div");
        cardSwitchContainer.className = "switch-container";
    
        let cardSwitchP = document.createElement("p");
        cardSwitchP.innerHTML = "Read";

        //label section
        let cardSwitchLabel = document.createElement("label");
        cardSwitchLabel.className = "switch";
        
        //interior of label section
        let cardSwitchLabelInput = document.createElement("input");
        cardSwitchLabelInput.type = "checkbox";
    
        let cardSwitchLabelSpan = document.createElement("span");
        cardSwitchLabelSpan.className = "slider round";
        
        //append info to label
        cardSwitchLabel.append(cardSwitchLabelInput, cardSwitchLabelSpan);
        //append all switch info to container
        cardSwitchContainer.append(cardSwitchP, cardSwitchLabel);

    
        //Append all info inside the card info container
        cardInfo.append(cardTitle, cardAuthor, cardPagesNum, cardSwitchContainer);
        //End card info section
    

        //Start card button section
        let cardButtonContainer = document.createElement("div");
        cardButtonContainer.className = "card-btn-container";
        
        let cardEditButton = document.createElement("button");
        cardEditButton.id = "edit-btn";
        cardEditButton.type = "button";
        cardEditButton.innerHTML = "Edit";
    
        let cardDeleteButton = document.createElement("button");
        cardDeleteButton.id = "delete-btn";
        cardEditButton.type = "button";
        cardDeleteButton.innerHTML = "Delete"

        //append info to button container
        cardButtonContainer.append(cardEditButton, cardDeleteButton);
        
        //append card info to card container
        bookCard.append(cardInfo, cardButtonContainer);

        //append card to card container div
        cardContainer_div.appendChild(bookCard);
    });
};

//Display the user data in the side column
function displayData() {
    bookNum_span.innerHTML = myLibrary.length;
};


function addBookToLibrary(obj){
    myLibrary.push(obj);
};


function openForm() {
    plus_div.addEventListener("click", e => {
        console.log(e);
    });
};



const book1 = new book("Bend Sinister", "Nabakov", "450", "not read yet");
const book2 = new book("1984", "Orwell", "350", "read");

let myLibrary = [book1, book2];


openForm();
displayBooks();
displayData();

  