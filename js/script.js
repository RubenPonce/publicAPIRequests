//XML requests
let xhr = new XMLHttpRequest();
const url = 'https://randomuser.me/api/?format=json';

//let declarations
let empCardMarkup = [];
let empModel = [];
let gallery = document.querySelector('#gallery');
let body = document.querySelector('body');
let employeeIndex = 0;
let maxEmployees= 12;

//----------------------function declarations-------------------------- 

function appendEmpModel(dataPart){
body.innerHTML += dataPart
document.querySelector('#modal-close-btn').onclick = function (){
document.querySelector('div[class = "modal-container"]').style.display = 'none';

}
  appendClickEvent();
}
//add the click events to the cards.
function appendClickEvent(){
    let empCards = [...document.querySelectorAll('.card')];
    
            for(let i=0; i<empCards.length; i++) {
                console.log(i);
                empCards[i].onclick = function(){
                
                appendEmpModel(empModel[i]);
            };//end click handler
         }//end forEach empCard
        }


function appendEmpCards(dataPart){
    gallery.innerHTML += dataPart;
   // dataPiece.addEventListener("click", => displayEmpModel(dataPiece))
}


function createEmpModel(data){
    return `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${data.results[0].picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.results[0].name.first} ${data.results[0].name.last}</h3>
            <p class="modal-text">${data.results[0].email}</p>
            <p class="modal-text cap">${data.results[0].location.city}</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>
    `
}

function createEmpData(data){
    return ` <div class="card"> <div class="card-img-container">   <img class="card-img" src=${data.results[0].picture.large} alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${data.results[0].name.first} ${data.results[0].name.last}</h3>
                            <p class="card-text">${data.results[0].email}</p>
                            <p class="card-text cap">${data.results[0].location.city}, ${data.results[0].location.state}</p>
                        </div>
                    </div>
    `
}
//----------------------end function declarations-------------------------- 

//----------------------main application ----------------------
while(employeeIndex<12){
    //gathers employee data 12 times
    fetch(url)
        .then(response => {    
            return response.text();
    })
        .then(data => {
            employeeData = JSON.parse(data);//push all the JSON data into the 'empCardMarkup' array.
           empCardMarkup.push(createEmpData(employeeData));
            empModel.push(createEmpModel(employeeData));

            
            if(empCardMarkup.length ===maxEmployees){//if employees finish loading, display them all and replace loading message.
                        empCardMarkup.forEach(dataPiece => {
                            appendEmpCards(dataPiece);
                                });
                              appendClickEvent();
                }
                document.querySelector("#employee-load").style.display = "none";
            }  
    );
    employeeIndex++;
    }
// ----------------------end main application ----------------------
  