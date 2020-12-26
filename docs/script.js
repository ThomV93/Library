let myLibrary = [];
const cardContainer_div = document.getElementById("card-container");
const cardCreator_div = document.getElementById("creator-container");
const cardDeleteButton_btn = document.getElementsByClassName("delete-btn");
const cardEditButton_btn = document.getElementsByClassName("edit-btn");
const plus_div = document.getElementById("plus");
const formContainer_div = document.getElementById("form-container");
const formBtnContainer_div = document.getElementById("form-btn-container");
const formCancelBtn = document.getElementById("cancel-btn");
const formCreateBtn = document.getElementById("create-btn");
const formEditBtn = document.getElementById("form-edit-btn");
const bookTitle_input = document.getElementById("book-title");
const author_input = document.getElementById("author");
const pages_input = document.getElementById("total-pages");
const bookCount_span = document.getElementById("book-num");
const completedBookNum_span = document.getElementById("completed-book-num");
const totalPageNum_span = document.getElementById("total-page-num");
const totalCompletedPageNum_span = document.getElementById("total-completed-page-num");
const searchBar_input = document.getElementById("search");

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
function displayBook(book) {
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
    cardSwitchLabelInput.className = "switch-checkbox";
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
        newBook = new book(inputTitle, inputAuthor, inputPages, false);
        addBookToLibrary(newBook);
        displayBook(newBook);
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


//add event to the edit button in the card and perform necessary actions
function editCardButton() {
    let lastBookEditBtn = Array.from(cardEditButton_btn).pop();
    lastBookEditBtn.addEventListener("click", e => {
        //select HTML elements to edit
        let chosenCard = e.path[2];
        let chosenCardTitle = chosenCard.getElementsByClassName("card-title");
        let chosenCardAuthor = chosenCard.getElementsByClassName("card-author");
        let chosenCardPages = chosenCard.getElementsByClassName("card-pages");

        //populate the form with the current values of each field
        bookTitle_input.value = chosenCardTitle[0].innerHTML;
        author_input.value = chosenCardAuthor[0].innerHTML;
        pages_input.value = chosenCardPages[0].innerHTML;

        //select correct book obj
        let bookPositionEdit = myLibrary.findIndex(o => o.title == chosenCardTitle[0].innerHTML);
        let obj = myLibrary[bookPositionEdit];

        editFormButton();

        //add click event to the edit button inside the form
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


//add event to the delete button in the card and perform necessary actions
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


//search bar dinamically hides results that don't match
function searchBar() {
    let filter = searchBar_input.value.toUpperCase();
    let cards = cardContainer_div.getElementsByClassName("card");
    let txtValue;
    for (i = 1; i < cards.length; i++) {
        let card = cards[i];
        txtValue = card.textContent || card.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    }
};


//input event listener
function activateSearchBar() {
    searchBar_input.addEventListener("input", () => {
        searchBar();
    });
};


/*function displayData() {
    bookCount_span.innerHTML = myLibrary.length;
};*/

//setInterval(displayData, 300);


openForm();
createBookForm();
activateSearchBar();



//read checkbox
//the overall data is displayed in the side column
//have both local and remote storage for the project
//create display function to display all the HTML cards after reloading