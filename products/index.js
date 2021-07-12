let expired = document.getElementById("expired"); //expired checkbox
let lowstock = document.getElementById("lowstock"); //lowstock checkbox

let date = new Date(); //current date to compare data date
let currentDate = date.getDate();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();
let month = { //created am object when called based on month give out the month no. for comparing
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}


let count = document.getElementById("count"); //to alter the count on page on filter
let tbody = document.getElementById("tbody");

let data;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        data = JSON.parse(this.response);
        count.innerHTML = data.length;

        for(let i = 0; i < data.length; i++) { //iterates through backend data
            makeCard(data[i]);
        }


        function makeCard(data) { //card maker
            let tr = document.createElement("tr");
            tr.classList = "card";
            
            let td1 = document.createElement("td");
            td1.innerHTML = data.id;
            let td2 = document.createElement("td");
            td2.innerHTML = data.medicineName;
            let td3 = document.createElement("td");
            td3.innerHTML = data.medicineBrand;
            
            let td4 = document.createElement("td");
            td4.innerHTML = data.expiryDate;

            let cardDate = data.expiryDate;
            let dateArr = cardDate.split("-");

            if(dateArr[2] < currentYear) { //filters the card by getting the todays date
                tr.classList.add("expired"); //adds class to hide later on filter
            } else if (dateArr[2] === currentYear && month[dateArr[1]] < currentMonth) {
                tr.classList.add("expired");
            } else if ( dateArr[2] === currentYear && month[dateArr[1]] === currentMonth && dateArr[0] < currentDate) {
                tr.classList.add("expired");
            }

            let td5 = document.createElement("td");
            td5.innerHTML = "$" + data.unitPrice;

            let td6 = document.createElement("td");
            td6.innerHTML = data.stock;
            if(data.stock < 100) { // adds class to hide later on filter
                tr.classList.add("lowstock")
            }

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);

            tbody.appendChild(tr);
        }
        
    }
}

expired.addEventListener("click", function(e){ //calling event on expired checkbox
    
    var hideExpire = document.getElementsByClassName("expired"); //get all expired class

    let l = hideExpire.length;
    let newCount = document.getElementById("count");

    if(this.checked) { //by default the filters are already check so the 2nd condition runs 1st
        newCount.innerHTML = parseInt(newCount.innerHTML) + l; 
    } else if (!this.checked){
        newCount.innerHTML = parseInt(newCount.innerHTML) - l; //reduces the expired class elem no.
    }

    for(let i = 0; i < hideExpire.length; i++) { //iterates through the expired class cards and hides and unhides on check
        if(!this.checked) {
            hideExpire[i].style.display = "none";
        } else if (this.checked) {
            hideExpire[i].style.display = "table-row";
        }
    }
    
})

lowstock.addEventListener("click", function(e){
    var hideLowStock = document.getElementsByClassName("lowstock"); //gets all lowstock class elements and does the same 


    let l = hideLowStock.length;
    let newCount = document.getElementById("count");

    if(this.checked) {
        newCount.innerHTML = parseInt(newCount.innerHTML) + l;
    } else if (!this.checked){
        newCount.innerHTML = parseInt(newCount.innerHTML) - l;
    }
    
    for(let i = 0; i < hideLowStock.length; i++) {
        if(!this.checked) {
            hideLowStock[i].style.display = "none";
        } else if (this.checked) {
            hideLowStock[i].style.display = "table-row";
        }
    }
})



