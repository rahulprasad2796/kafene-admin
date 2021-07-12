
let tbody = document.getElementById("tbody"); //get the html body

let data;

function makeCard(data) { //to make card
    let tr = document.createElement("tr");
    tr.classList = "card";
    
    let td1 = document.createElement("td");
    td1.innerHTML = data.id;
    let img = document.createElement("img");
    img.src = data.profilePic;
    let td3 = document.createElement("td");
    td3.innerHTML = data.fullName;
    
    let td4 = document.createElement("td");
    td4.innerHTML = data.dob;

    let td5 = document.createElement("td");
    td5.innerHTML = data.gender;

    let td6 = document.createElement("td");
    td6.innerHTML = data.currentCity + "," + data.currentCountry;

    tr.appendChild(td1);
    tr.appendChild(img);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tbody.appendChild(tr);
}

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        data = JSON.parse(this.response);
        
        for(let i = 0; i < data.length; i++) { //call the card maker function
            makeCard(data[i]);
        }        
    }
}

let card = document.getElementsByClassName("card");
let newTbody = document.getElementsByTagName("tbody") //again call tbody
let newData;
let user = document.getElementById("user"); //input element

user.addEventListener("keypress", function(e){ //callin event to run on enter press

    if(e.key === "Enter") {
        if(user.value.length < 2) { //checks the no. of value to be 2
            alert("Please enter at least 2 characters");
        } else if (user.value.length >= 2) {
            let search = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" + user.value; //add the query/ search name
            
            xhttp.open("GET", search, true); //again call the GET request on previous xmlhttp request with the new url
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4) {
                    newData = JSON.parse(this.response);
                    
                    for(let k = 0; k < card.length; k++) { //hides the previous appended data 
                        card[k].style.display = "none";
                    }
                    for(let i = 0; i < newData.length; i++) { // again calling the cardMaker
                        newMakeCard(newData[i]);
                    }
                }
            }
        }
    }

    
})
function newMakeCard(data) { //search card maker
    let tr = document.createElement("tr");
    tr.classList = "card";
    tr.classList.add("search") //make it different from other cards
    
    let td1 = document.createElement("td");
    td1.innerHTML = data.id;
    let img = document.createElement("img");
    img.src = data.profilePic;
    let td3 = document.createElement("td");
    td3.innerHTML = data.fullName;
    
    let td4 = document.createElement("td");
    td4.innerHTML = data.dob;

    let td5 = document.createElement("td");
    td5.innerHTML = data.gender;

    let td6 = document.createElement("td");
    td6.innerHTML = data.currentCity + "," + data.currentCountry;

    tr.appendChild(td1);
    tr.appendChild(img);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    newTbody[0].appendChild(tr);
}


let reset = document.getElementById("reset"); //reset the page to back
reset.addEventListener("click", function() { //display of hidden cards are set back to normal
    user.value = "";
    for(let k = 0; k < card.length; k++) {
        card[k].style.display = "table-row";
    }
})

$(document).ready(function() { //used jquery for this to remove all search class cards at once. 
    $("#reset").click(function(){
        $(".search").remove();
    })
})