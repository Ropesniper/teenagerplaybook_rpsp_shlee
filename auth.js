function navRender(){
const nav=document.getElementById("nav");
if(!nav) return;
const logged=localStorage.getItem("tp_login");
if(logged){
nav.innerHTML=`
<a href="index.html">Dashboard</a>
<a href="sessions.html">My Sessions</a>
<a href="history.html">History</a>
<a href="references.html">References</a>
<a href="about.html">About the Project</a>
<a href="#" onclick="logout()">Logout</a>
`;
}else{
nav.innerHTML=`
<a href="index.html">Dashboard</a>
<a href="sessions.html">My Sessions</a>
<a href="history.html">History</a>
<a href="references.html">References</a>
<a href="about.html">About the Project</a>
<a href="login.html">Login</a>
`;
}
}
navRender();


function login(){
const e=document.getElementById("email").value;
const p=document.getElementById("password").value;
if(e && p){
localStorage.setItem("tp_login","true");
window.location.href="index.html";
}else alert("Enter email and password");
}


function logout(){
localStorage.removeItem("tp_login");
window.location.href="index.html";
}
