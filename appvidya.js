let adviceItemsContainer = document.getElementById("adviceItemsContainer");
let addNewButton = document.getElementById("addNewButton");
let saveBtnEl = document.getElementById("saveBtn");
let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        imageLink,
        author
    } = result;


    let resultItemEl = document.createElement("div", "col-12", "md-col-4");
    resultItemEl.classList.add("result-item");


    let urlElImg = document.createElement("img");
    urlElImg.src = imageLink;
    resultItemEl.appendChild(urlElImg);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = author;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);


}


function displayResults(searchresults) {
    spinnerEl.classList.add("d-none");
    let headingEl = document.createElement('h1');
    searchResultsEl.appendChild(headingEl)
    if (searchresults.length === 0) {
        headingEl.textContent = 'No results found'
    } else {
        headingEl.textContent = 'Popular Books';
        headingEl.classList.add("popular-books")
        for (let result of searchresults) {
            createAndAppendSearchResult(result);
        }
    }

}

function libraryManagement(event) {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData)
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);


            });
    }
}

searchInputEl.addEventListener("keydown", libraryManagement);

function listFromTheLocalStorage() {
    let stringifiedEl = localStorage.getItem("bookList");
    let parsedList = JSON.parse(stringifiedEl);
    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }

}

let bookList = listFromTheLocalStorage();


saveBtnEl.onclick = function() {
    localStorage.setItem("bookList", JSON.stringify(bookList));
};

let bookCount = bookList.length;

function onTodoStatusChange(checkboxId, labelId, bookId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle('checked');

    let todoObjectIndex = bookList.findIndex(function(eachItem) {
        let eachTodoId = "book" + eachItem.uniqueNo;
        if (eachTodoId === bookId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = bookList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(bookId) {
    let bookElement = document.getElementById(bookId);

    adviceItemsContainer.removeChild(bookElement);

    let deleteElementIndex = bookList.findIndex(function(eachBook) {
        let eachbookId = "book" + eachBook.uniqueNo;
        if (eachbookId === bookId) {
            return true;
        } else {
            return false;
        }
    });
    bookList.splice(deleteElementIndex, 1);
    console.log(bookList);
}

function createAndAppendTodo(book) {
    let bookId = 'book' + book.uniqueNo;
    let checkboxId = 'checkbox' + book.uniqueNo;
    let labelId = 'label' + book.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("book-item-container", "d-flex", "flex-row");
    todoElement.id = bookId;
    adviceItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = book.isChecked;


    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, bookId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    if (book.isChecked === true) {
        labelElement.classList.add("checked")
    }
    labelElement.textContent = book.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(bookId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let book of bookList) {
    createAndAppendTodo(book);
}

function onAddTodo() {
    let bookInputElement = document.getElementById("bookUserInput");
    let userInputValue = bookInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    bookCount = bookCount + 1;

    let newBook = {
        text: userInputValue,
        uniqueNo: bookCount,
        isChecked: false
    };
    bookList.push(newBook);

    createAndAppendTodo(newBook);
    bookInputElement.value = "";
}

addNewButton.onclick = function() {
    onAddTodo();
};
let myFormEl = document.getElementById("myForm");

let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

nameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
});

emailEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
});

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
});