let form = document.getElementById("form"); //submit is event for form so get form element
let userName = document.getElementById("username"); //username , password and submit button
let passWord = document.getElementById("password");
let submit = document.getElementById("submit");
let user = []; //to store data in local


form.addEventListener("submit", function(e){ //submit event called default for submission is stopped
    e.preventDefault();
    if(userName.value === passWord.value) { //checking the loging credentials on login success redirects to orders page
        window.alert("Login Successful");
        location.assign("/orders/index.html");
        user.push(userName.value, passWord.value);
        localStorage.setItem("store",JSON.stringify(user)); //stores data in local
    } else if (userName.value !== passWord.value) {
        window.alert("Please enter valid credentials!") //wrong login credentials
    }
})

let store = localStorage.getItem("store"); //again store is called and when the page reloads the
let storeP = JSON.parse(store); //it checks whether data is there in local
if(store) { //to see the correct loged in status
    userName.value = storeP[0];
    passWord.value = storeP[1];
    // location.assign("/orders/index.html")
}