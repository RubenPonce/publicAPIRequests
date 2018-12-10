//XML requests
let xhr = new XMLHttpRequest();
const url = 'https://randomuser.me/api/?format=json&nat=US&results=12';

//let declarations
let empCardMarkup = [];
let empModel = [];
let gallery = document.querySelector('#gallery');
let body = document.querySelector('body');
let employeeIndex = 0;

let maxEmployees= 12;
let searchBar = document.querySelector('div[class="search-container"]');
createSearchBar();
let searchInput = document.querySelector('#search-input');

const nameRegex = new RegExp(/^[A-Za-z]{0,30}$/);

//----------------------function declarations-------------------------- 

function appendEmpModel(dataPart){
body.innerHTML += dataPart;
document.querySelector('#modal-close-btn').onclick = function (){
let div = document.querySelector('div[class = "modal-container"]');
div.remove(div);
}
appendClickEvent();
}

function checkNameMatch(name,value) {
    if(name.includes(value)){
        return true;
    }
    else{
        return false;
    }

}


//add the click events to the cards.
function appendClickEvent(){
    let empCards = [...document.querySelectorAll('.card')];
    
            for(let i=0; i<empCards.length; i++) {
                console.log(i);
                empCards[i].onclick = function(){
                console.log(empModel[i]);
                
                appendEmpModel(empModel[i]);
                 
            };//end click handler
         
         }//end forEach empCard
 
        }


function appendEmpCards(dataPart){
    gallery.innerHTML += dataPart;
   // dataPiece.addEventListener("click", => displayEmpModel(dataPiece))
}
function createSearchBar(){
    searchBar.innerHTML += `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
}

function createEmpModel(data){
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
            <p class="modal-text">Birthday: ${(data.dob.date).slice(0,10)}</p>
        </div>
    </div>
    `
}

function createEmpData(data){
    return ` <div class="card"> <div class="card-img-container">   <img class="card-img" src=${data.picture.large} alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                            <p class="card-text">${data.email}</p>
                            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
                        </div>
                    </div>
    `
}
//----------------------end function declarations-------------------------- 

//----------------------main application ----------------------

    //gathers employee data 12 times
    fetch(url)
        .then(response => {    
            return response.text();
    })
        .then(data => {
            //push all the JSON data into the 'empCardMarkup' array.
           console.log(JSON.parse(data));
           let employeeData = JSON.parse(data);
           console.log(employeeData.results);
            employeeData.results.forEach(result =>{
                console.log(result);
               
                empCardMarkup.push( createEmpData(result) );
                empModel.push(createEmpModel(result));
            })//end foreach

            if(empCardMarkup.length ===maxEmployees){//if employees finish loading, display them all and replace loading message.
                        empCardMarkup.forEach(dataPiece => {
                            appendEmpCards(dataPiece);
                                });
                              appendClickEvent();
                              document.querySelector("#employee-load").style.display = "none";
                              
                              let nameCollection = [...document.querySelectorAll('#name')];
                             searchInput.focus();
                              searchInput.onkeyup = function(){
                               const nameText = nameCollection.map(names => names.textContent);
                               for (let i = 0; i < nameText.length; i++) {
                                    if( !checkNameMatch(nameText[i],searchInput.value) ) {
                                        console.log(nameText[i]);
                                        nameCollection[i].parentElement.parentElement.style.display = "none";
                                    } else{
                                        nameCollection[i].parentElement.parentElement.style.display = "flex";
                                    }
                                //end foreach NameText
                                   
                                   
                                   
                               }
                                console.log(searchInput.value);
                            }//end keyUp
                }
               //add search bar functionality here
               
            }

    );

    
// ----------------------end main application ----------------------
  