let myLibrary = [];
const cardContainer_div = document.getElementById("card-container");
const cardCreator_div = document.getElementById("creator-container");
const cardDeleteButton_btn = document.getElementsByClassName("delete-btn");
const cardEditButton_btn = document.getElementsByClassName("edit-btn");
const cardSwitchCheckbox_chb = document.getElementsByClassName("switch-checkbox");
const plus_div = document.getElementById("plus");
const formContainer_div = document.getElementById("form-container");
const formTitle_h2 = document.getElementById("form-title");
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
const deleteLocalStorage_btn = document.getElementById("delete-local-btn");


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
        formTitle_h2.innerHTML = "New Book";
        formContainer_div.style.display = "flex";
    });
};


//Close the form and erase the values
function closeForm() {
    formContainer_div.style.display = "none";
};


//Add keyboard listener to the pages field of the form to allow only numbers
/*function pageInputForm() {
    pages_input.addEventListener("keydown", e => {
        //regEx to check if the input is a number
        let rawInput = parseInt(e.key);
        let treatedInput = /[^0-9]/.test(rawInput);
        let stringInput = treatedInput.toString();
        console.log(stringInput);
        console.log(typeof(stringInput));
        

        if (treatedInput === true) {
            pages_input.value =+ stringInput;
        }; 
    });
};*/


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
        localSaveLibrary();//update the myLibrary array in the local storage
        displayBook(newBook);//create the visual display for each book
        readCheckbox(newBook);
        editCardButton();
        deleteCardButton();
        totalBooks();//calculate and displays the total number of books
        totalPages();//calculate and displays the total number of pages
        closeForm();
    });
};


//Create the new edit button for the form
function editFormButton(idx) {
    //hides the create button
    formCreateBtn.style.display = "none";
    //display edit button
    formEditBtn.style.display = "block";
    //change form title
    formTitle_h2.innerHTML = `Edit Book Nº ${idx}`;
    //display form
    formContainer_div.style.display = "flex";
};


//add event listener to the form edit button
function editBtnFormlistener() {
    formEditBtn.addEventListener("click", () => {
        //select correct book obj
        let bookPositionEdit = formTitle_h2.innerHTML.slice(-1);
        let obj = myLibrary[bookPositionEdit];

        //select correct HTML element values
        let allCardsInfo_div = document.getElementsByClassName("card-info");
        let correctCardInfo = allCardsInfo_div[bookPositionEdit];
        correctCardInfo.childNodes[0].innerHTML;
        correctCardInfo.childNodes[1].innerHTML;
        correctCardInfo.childNodes[2].innerHTML;

        //alter HTML element values
        correctCardInfo.childNodes[0].innerHTML = bookTitle_input.value;
        correctCardInfo.childNodes[1].innerHTML = author_input.value;
        correctCardInfo.childNodes[2].innerHTML = pages_input.value;

        //alter book obj values
        obj.title = bookTitle_input.value;
        obj.author = author_input.value;
        obj.pages = pages_input.value;

        totalBooks();
        totalPages();
        totalCompleteBooks();
        totalCompletePages();
        localSaveLibrary();
        closeForm();
    });
};


//add event to the edit button in the card and perform necessary actions
function editCardButton() {
    let lastBookEditBtn = Array.from(cardEditButton_btn).pop();
    lastBookEditBtn.addEventListener("click", e => {
        console.log(e);
        //select HTML elements to edit
        let chosenCard = e.path[2];
        let cardPosition = chosenCard.dataset.position;
        let chosenCardTitle = chosenCard.getElementsByClassName("card-title");
        let chosenCardAuthor = chosenCard.getElementsByClassName("card-author");
        let chosenCardPages = chosenCard.getElementsByClassName("card-pages");

        //populate the form with the current values of each field
        bookTitle_input.value = chosenCardTitle[0].innerHTML;
        author_input.value = chosenCardAuthor[0].innerHTML;
        pages_input.value = chosenCardPages[0].innerHTML;

        editFormButton(cardPosition);
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
            localSaveLibrary();
            e.path[2].remove();
        };
    });
};


//add event to the switch checkbox and alters the read key in the respective object
function readCheckbox(item) {
    let lastSwitchCheckbox = Array.from(cardSwitchCheckbox_chb).pop();
    lastSwitchCheckbox.addEventListener("change", () => {
        if (lastSwitchCheckbox.checked){
            item.read = true;
        } else {
            item.read = false;
        };
        totalCompleteBooks();
        totalCompletePages();
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


//calculate and display the total number of books
function totalBooks() {
    bookCount_span.innerHTML = myLibrary.length;
};


//calculate and display the total number of read books
function totalCompleteBooks() {
    let readBooks = 0;
    for (i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].read === true) {
            readBooks++;
        };
    };
    completedBookNum_span.innerHTML = readBooks;
};


//calculate and display the total number of pages
function totalPages() {
    let totalpageNum = myLibrary.reduce((acc, item) => acc += parseInt(item.pages),0);
    totalPageNum_span.innerHTML = totalpageNum;
};


//calculate and display the total number of read pages
function totalCompletePages() {
    let totalReadPages = 0;
    for (i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].read === true) {
            totalReadPages += parseInt(myLibrary[i].pages);
        };
    };
    totalCompletedPageNum_span.innerHTML = totalReadPages;
};


//Save myLibrary data to the local storage object
function localSaveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); //JSON.stringify converts all objects to strings. The server only accepts strings
};

//repopulates the display after recovering the data from storage
function displayCards() {
    for (i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i]);//create the visual display for each book
        readCheckbox(myLibrary[i]);
        editCardButton();
        deleteCardButton();
        totalBooks();//calculate and displays the total number of books
        totalPages();//calculate and displays the total number of pages
    };
};


//Get the myLibrary array after the page is reopened or refreshed
function restoreLibrary() {
    if (!localStorage.myLibrary) {
        //populates the display
        displayCards();
    } else {
        //recover the info stored locally
        let bookArray = localStorage.getItem('myLibrary')
        bookArray = JSON.parse(bookArray);
        myLibrary = bookArray;
        displayCards();
    }
}


function deleteLocalBtn() {
    deleteLocalStorage_btn.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    });
};


openForm();
editBtnFormlistener();
createBookForm();
activateSearchBar();
restoreLibrary();
deleteLocalBtn();
//pageInputForm();



//read checkbox after reload
//add regex to inputs in the form
//add remote storage

//Finishing touches
//no blind spots in the card creator