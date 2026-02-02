let timers={
intonation:[5,12],
body:[7,15],
face:[6,14]
};
let currentSession="";
let pauseIndex=0;


function goSessions(){
if(!localStorage.getItem("loggedIn")){
window.location.href="login.html";
}else{
window.location.href="sessions.html";
}
}


function openSession(type){
currentSession=type;
pauseIndex=0;
const modal=document.getElementById("videoModal");
const video=document.getElementById("sessionVideo");


// YOU will replace these later
const sources={
intonation:"videos/intonation1.mp4",
body:"videos/body1.mp4",
face:"videos/face1.mp4"
};


video.src=sources[type];
modal.classList.remove("hidden");


video.ontimeupdate=function(){
if(pauseIndex < timers[type].length && video.currentTime >= timers[type][pauseIndex]){
video.pause();
runAI(type);
pauseIndex++;
}
};
}


function closeVideo(){
document.getElementById("videoModal").classList.add("hidden");
const video=document.getElementById("sessionVideo");
video.pause();
video.currentTime=0;
}
