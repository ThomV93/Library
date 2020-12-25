let myLibrary = [];
const cardContainer_div = document.getElementById("card-container");
const cardCreator_div = document.getElementById("creator-container");
const cardDeleteButton_btn = document.getElementsByClassName("delete-btn");
const cardEditButton_btn = document.getElementsByClassName("edit-btn");
const plus_div = document.getElementById("plus");
const formContainer_div = document.getElementById("form-container");
const formBtnContainer_div = document.getElementById("form-btn-container");
const bookTitle_input = document.getElementById("book-title");
const author_input = document.getElementById("author");
const pages_input = document.getElementById("total-pages");
const formCancelBtn = document.getElementById("cancel-btn");
const formCreateBtn = document.getElementById("create-btn");
const formEditBtn = document.getElementById("form-edit-btn");
const bookCount_span = document.getElementById("book-num");
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
function displayBooks(book) {
    //create card element
    let bookCard = document.createElement("div");
    bookCard.className = "card";
    bookCard.dataset.position = myLibrary.indexOf(book);


    //card info section
    let cardInfo = document.createElement("div");
    cardInfo.className = "card-info";

    let cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = book.title;

    let cardAuthor = document.createElement("p");
    cardAuthor.className = "card-author";
    cardAuthor.innerHTML = book.author;

    let cardPagesNum = document.createElement("p");
    cardPagesNum.className = "card-pages";
    cardPagesNum.innerHTML = book.pages + " pages";


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
    cardEditButton.className = "edit-btn";
    cardEditButton.type = "button";
    cardEditButton.innerHTML = "Edit";

    let cardDeleteButton = document.createElement("button");
    cardDeleteButton.className = "delete-btn";
    cardEditButton.type = "button";
    cardDeleteButton.innerHTML = "Delete"

    //append info to button container
    cardButtonContainer.append(cardEditButton, cardDeleteButton);
    
    //append card info to card container
    bookCard.append(cardInfo, cardButtonContainer);

    //append card to card container div
    cardContainer_div.appendChild(bookCard);
};


//Push each new object created in the myLibrary array
function addBookToLibrary(obj){
    myLibrary.push(obj);
};


//Makes the new book form visible
function openForm() {
    plus_div.addEventListener("click", () => {
        bookTitle_input.value = "";
        author_input.value = "";
        pages_input.value = "";
        formCreateBtn.style.display = "block";
        formEditBtn.style.display = "none";
        formContainer_div.style.display = "flex";
    });
};


//Close the form and erase the values
function closeForm() {
    bookTitle_input.value = "";
    author_input.value = "";
    pages_input.value = "";
    formContainer_div.style.display = "none";
};


//Add event listeners in each button of the form
function createBookForm(newBook) {
    //cancel button
    formCancelBtn.addEventListener("click", () => {
        formContainer_div.style.display = "none";
    });

    //create new book button
    formCreateBtn.addEventListener("click", () => {
        let inputTitle = bookTitle_input.value;
        let inputAuthor = author_input.value;
        let inputPages = pages_input.value;

        //create a new book object with the provided values
        newBook = new book(inputTitle, inputAuthor, inputPages, "false");
        addBookToLibrary(newBook);
        displayBooks(newBook);
        editCardButton();
        deleteCardButton();
        closeForm();
    });
};

//Create the new edit button for the form
function editFormButton() {
    //hides the create button
    formCreateBtn.style.display = "none";
    //display edit button
    formEditBtn.style.display = "block";
    //display form
    formContainer_div.style.display = "flex";
};

function editCardButton() {
    let lastBookEditBtn = Array.from(cardEditButton_btn).pop();
    lastBookEditBtn.addEventListener("click", e => {
        //open form with present values
        let bookPositionEdit = e.path[2].dataset.position;
        let obj = myLibrary[bookPositionEdit];
        bookTitle_input.value = obj.title;
        author_input.value = obj.author;
        pages_input.value = obj.pages;

        //select HTML elements to edit
        let chosenCard = e.path[2];
        let chosenCardTitle = chosenCard.getElementsByClassName("card-title");
        let chosenCardAuthor = chosenCard.getElementsByClassName("card-author");
        let chosenCardPages = chosenCard.getElementsByClassName("card-pages");

        editFormButton();

        formEditBtn.addEventListener("click", () => {
            //alter book obj values
            obj.title = bookTitle_input.value;
            obj.author = author_input.value;
            obj.pages = pages_input.value;

            //alter HTML element values
            chosenCardTitle[0].innerHTML = bookTitle_input.value;
            chosenCardAuthor[0].innerHTML = author_input.value;
            chosenCardPages[0].innerHTML = pages_input.value;

            closeForm();
        });
    });
};

function deleteCardButton() {
    let lastBookDeleteBtn = Array.from(cardDeleteButton_btn).pop();
    lastBookDeleteBtn.addEventListener("click", e => {
        let bookPosition = e.path[2].dataset.position;
        if (bookPosition === 0){
            myLibrary = [];
        } else {
            myLibrary.splice(bookPosition, 1);
            e.path[2].remove();
        };
    });
};


openForm();
createBookForm();


  //search button performs a dinamic search
  //the overall data is displayed in the side column
  //have both local and remote storage for the project