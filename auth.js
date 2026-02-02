function updateNav(){
const nav=document.getElementById("nav-links");
if(!nav) return;
const logged=localStorage.getItem("loggedIn");
if(logged){
nav.innerHTML=`<a href="index.html">Home</a><a href="sessions.html">Sessions</a><a href="#" onclick="logout()">Logout</a>`;
}else{
nav.innerHTML=`<a href="index.html">Home</a><a href="login.html">Login</a>`;
}
}
updateNav();


function login(){
const email=document.getElementById("email").value;
const pass=document.getElementById("password").value;
if(email && pass){
localStorage.setItem("loggedIn","true");
window.location.href="index.html";
}else{
alert("Enter email and password");
}
}


function logout(){
localStorage.removeItem("loggedIn");
window.location.href="index.html";
}
