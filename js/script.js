

//----------variable declarations----------
//XML requests
let xhr = new XMLHttpRequest();
const url = 'https://randomuser.me/api/?format=json&nat=US&results=12';

//for main application
let empCardMarkup = [];
let empModal = [];
let gallery = document.querySelector('#gallery');
let body = document.querySelector('body');
let employeeIndex = 0;
let maxEmployees = 12;
//search bar 
let searchBar = document.querySelector('div[class="search-container"]');
createSearchBar();
let searchInput = document.querySelector('#search-input');

const nameRegex = new RegExp(/^[A-Za-z]{0,30}$/);
//----------end variable declarations----------

//----------------------function declarations-------------------------- 

//implements HTML to match modal, and cards.
function createAndAppendItems(createFunction) {
    let createDiv = document.createElement('div');
    createDiv.innerHTML = createFunction;
    body.appendChild(createDiv);
}
function prevButtonEvents(parameter) {
    let prev = document.querySelector('#modal-prev');
    prev.onclick = ('click', function () {
        let div = document.querySelector('div[class = "modal-container"]');
        div.remove(div);
        appendEmpModal(parameter);
        // prevButtonEvents(parameter);
    })//end click handler
}
//adds left and right key events for moving between employees
function listenForKey(key, data, index, keyValue, div, notEqual) {
    if (key === keyValue && index !== notEqual) {
        div.remove(div);
        appendEmpModal(data, index);
    }
}
//adds left and right click events for moving between employees
function addClick(index, data, notEqual, div, location) {
    location.onclick = function () {
        if (index !== notEqual) {
            div.remove(div);
            appendEmpModal(data, index);
        }
    }
}
//main function to append Modal
function appendEmpModal(dataPart, index) {
    createAndAppendItems(dataPart[index]);
    let div = document.querySelector('div[class = "modal-container"]');
    document.onkeydown = event => {
        let keyName = event.key;
        listenForKey(keyName, dataPart, index + 1, "ArrowRight", div, 12);
        listenForKey(keyName, dataPart, index - 1, "ArrowLeft", div, -1);
    };//end keydown

    let prev = document.querySelector('#modal-prev');
    let next = document.querySelector('#modal-next');
    //add click Events to 
    addClick(index + 1, dataPart, 12, div, next);
    addClick(index - 1, dataPart, -1, div, prev);
    //Modal 'X' button event
    document.querySelector('#modal-close-btn').onclick = function () {
        div.remove(div);
    }
}

//checks search value from search bar
function checkNameMatch(name, value) {
    if (name.includes(value)) {
        return true;
    }
    else {
        return false;
    }

}


//add the click events to the cards.
function appendClickEvent() {
    let empCards = [...document.querySelectorAll('.card')];

    for (let i = 0; i < empCards.length; i++) {

        empCards[i].onclick = function () {

            appendEmpModal(empModal, i);

        };//end click handler

    }//end forEach empCard

}


//--------------------------------HTML append data---------------------------------
//appends the employee cards to the display
function appendEmpCards(dataPart) {
    gallery.innerHTML += dataPart;
    // dataPiece.addEventListener("click", => displayEmpModal(dataPiece))
}
//appends the searchbar to the display
function createSearchBar() {
    searchBar.innerHTML += `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
}
//return Modal HTML to be used in createAndAppendItems();
function createEmpModal(data) {
    return `
    
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${data.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.cell}</p>
            <p class="modal-text">${(data.location.street).toUpperCase()}, ${(data.location.city).toUpperCase()}, ${(data.location.state).toUpperCase()} ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${(data.dob.date).slice(0, 10)}</p>
        </div>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div>
    
    `
}
//return card HTML to be used in createAndAppendItems();
function createEmpData(data) {
    return ` <div class="card"> <div class="card-img-container">   <img class="card-img" src=${data.picture.large} alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                            <p class="card-text">${data.email}</p>
                            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
                        </div>
                    </div>
    `
}//-------------------------------- end HTML append---------------------------------
//----------------------end function declarations-------------------------- 

//----------------------main application ----------------------

//gathers employee data 12 times
fetch(url)
    .then(response => {
        return response.text();
    })
    .then(data => {
        //push all the JSON data into the 'empCardMarkup' array.
        let employeeData = JSON.parse(data);
        employeeData.results.forEach(result => {
            empCardMarkup.push(createEmpData(result));
            empModal.push(createEmpModal(result));
        })//end foreach

        //if employees finish loading, display them all and replace loading message.
        if (empCardMarkup.length === maxEmployees) {
            empCardMarkup.forEach(dataPiece => {
                appendEmpCards(dataPiece);
            });
            appendClickEvent();
            document.querySelector("#employee-load").style.display = "none";
            let nameCollection = [...document.querySelectorAll('#name')];
            //functionality for appended search bar
            const searchSubmit = document.querySelector('#search-submit');
            searchSubmit.onsubmit = function (e) {
                e.target.disabled = "true";
            }
            searchInput.focus();
            searchInput.onkeyup = function () {
                let nameText = nameCollection.map(names => names.textContent);
                for (let i = 0; i < nameText.length; i++) {
                    if (!checkNameMatch(nameText[i], searchInput.value)) {
                        console.log(nameText[i]);
                        nameCollection[i].parentElement.parentElement.style.display = "none";
                    } else {
                        nameCollection[i].parentElement.parentElement.style.display = "flex";
                    } 
                }//end for loop
            }//end keyUp
        }
    }
    );
// ----------------------end main application ----------------------
