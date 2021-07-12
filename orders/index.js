let $new = document.getElementById("new"); //check boxs of page
let packed = document.getElementById("packed");
let inTransit = document.getElementById("intransit");
let deliverd = document.getElementById("deliverd");

let count = document.getElementById("count"); //count to change and load
let tbody = document.getElementById("tbody");

let data;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        data = JSON.parse(this.response);
        count.innerHTML = data.length;

        for(let i = 0; i < data.length; i++) { //iterates and call he card maker
            makeCard(data[i]);
        }


        function makeCard(data) {
            let tr = document.createElement("tr");
            tr.classList = "card";
            tr.classList.add(data.orderStatus); //adds unique class to each element as per status order
            let td1 = document.createElement("td");
            td1.innerHTML = data.id;
            let td2 = document.createElement("td");
            td2.innerHTML = data.customerName;
            let td3 = document.createElement("td");
            td3.innerHTML = data.orderDate + "<br>";
            let span = document.createElement("span");
            span.innerHTML = data.orderTime;
            td3.appendChild(span);
            let td4 = document.createElement("td");
            td4.innerHTML = "$" + data.amount;
            let td5 = document.createElement("td");
            td5.innerHTML = data.orderStatus;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            tbody.appendChild(tr);
        }
        
    }
}

$new.addEventListener("click", function(e){ //new checkbox 
    
    var hideNew = document.getElementsByClassName("New"); //get all element with staus new

    let l = hideNew.length;
    let newCount = document.getElementById("count");

    if(this.checked) { //by default the checked is applied
        newCount.innerHTML = parseInt(newCount.innerHTML) + l;
    } else if (!this.checked){
        newCount.innerHTML = parseInt(newCount.innerHTML) - l; //on uncheckng the count id deducted by the status new card lentgth
    }

    for(let i = 0; i < hideNew.length; i++) { //iterates through new class elem. and hides unhides them as per checked
        if(!this.checked) {
            hideNew[i].style.display = "none";
        } else if (this.checked) {
            hideNew[i].style.display = "table-row";
        }
    }
    
})

packed.addEventListener("click", function(e){ //same method applied on different checkboxes.
    var hidePacked = document.getElementsByClassName("Packed");


    let l = hidePacked.length;
    let newCount = document.getElementById("count");

    if(this.checked) {
        newCount.innerHTML = parseInt(newCount.innerHTML) + l;
    } else if (!this.checked){
        newCount.innerHTML = parseInt(newCount.innerHTML) - l;
    }
    
    for(let i = 0; i < hidePacked.length; i++) {
        if(!this.checked) {
            hidePacked[i].style.display = "none";
        } else if (this.checked) {
            hidePacked[i].style.display = "table-row";
        }
    }
})

inTransit.addEventListener("click", function(){

    var hideInTrans = document.getElementsByClassName("InTransit");

    let l = hideInTrans.length;
    let newCount = document.getElementById("count");

    if(this.checked) {
        newCount.innerHTML = parseInt(newCount.innerHTML) + l;
    } else if (!this.checked){
        newCount.innerHTML = parseInt(newCount.innerHTML) - l;
    }

    for(let i = 0; i < hideInTrans.length; i++) {
        if(!this.checked) {
            hideInTrans[i].style.display = "none";
        } else if (this.checked) {
            hideInTrans[i].style.display = "table-row";
        }
    }
})

deliverd.addEventListener("click", function(){

    var hideDeliverd = document.getElementsByClassName("Delivered");

    let l = hideDeliverd.length;
    let newCount = document.getElementById("count");

    if(this.checked) {
        newCount.innerHTML = parseInt(newCount.innerHTML) + l;
    } else if (!this.checked){
        newCount.innerHTML = parseInt(newCount.innerHTML) - l;
    }


    for(let i = 0; i < hideDeliverd.length; i++) {
        if(!this.checked) {
            hideDeliverd[i].style.display = "none";
        } else if (this.checked) {
            hideDeliverd[i].style.display = "table-row";
        }
    }
})