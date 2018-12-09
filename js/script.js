
let xhr = new XMLHttpRequest();
const url = 'https://randomuser.me/api/?format=json';
let gallery = document.querySelector('#gallery');
let userIndex = 0;
gallery.innerHTML += ('<p id = "d-message">Displaying 12 employees...');


while(userIndex<12){

    fetch(url)
        .then(response => {
            console.log(response);      
            return response.text();
    })
        .then(data => {
            userData = JSON.parse(data);
            console.log(userData);
            let markup = createData(userData);
            appendData(markup);
    });
    userIndex++;
    if(userIndex ===12){
        document.querySelector('#d-message').innerHTML = 'Displaying 12 employees';
    }
}


function appendData(child){
    gallery.innerHTML += child;
console.log(gallery);   
}

function createData(data){
    console.log(data.results[0].picture.large);
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


//xhr.load() = function(){ if(this.status == 200)...}
    //have it load, and then check for the status. 
     //jSON.parse to put into a variable
//xhr.send() to send the request


