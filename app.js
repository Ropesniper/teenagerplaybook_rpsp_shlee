const videoMap = {
  intonation:["videos/IntonationVideo1.mp4","videos/intonation2.mp4"],
  body:["videos/body1.mp4","videos/body2.mp4"],
  face:["videos/face1.mp4","videos/face2.mp4"]
};

const timers = {
  intonation:[[5,10],[6,14]],
  body:[[5,11],[7,16]],
  face:[[3,9],[5,13]]
};

let currentSession="", videoIndex=0, pauseIndex=0;

function requireLogin(){
  if(!localStorage.getItem("tp_login")) window.location.href="login.html";
}

function openVideo(sessionType,index){
  requireLogin();
  currentSession=sessionType;
  videoIndex=index;
  pauseIndex=0;
  loadVideo();
  document.getElementById("modal").classList.remove("hidden");
}

function loadVideo(){
  const v=document.getElementById("player");
  v.src = videoMap[currentSession][videoIndex];
  v.load();
  v.play();
}

function closeVideo(){
  document.getElementById("modal").classList.add("hidden");
  const v=document.getElementById("player");
  v.pause();
  v.currentTime=0;
}

function saveHistory(name){
  const h = JSON.parse(localStorage.getItem("tp_history")||"[]");
  h.push({video:name,time:new Date().toLocaleString()});
  localStorage.setItem("tp_history",JSON.stringify(h));
}

// Pause + Try to Repeat popup + AI callback
window.addEventListener("DOMContentLoaded",()=>{
  const v=document.getElementById("player");
  const popup=document.createElement("div");
  popup.id="repeat-popup";
  popup.className="modal-popup";
  popup.innerText="Try to Repeat!";
  document.body.appendChild(popup);

  if(!v) return;
  v.ontimeupdate=function(){
    const tlist=timers[currentSession][videoIndex];
    if(pauseIndex < tlist.length && v.currentTime >= tlist[pauseIndex]){
      v.pause();
      popup.style.display="block";
      if(currentSession==="intonation") runVoiceAI(()=>{popup.style.display="none"; v.play();});
      if(currentSession==="body") runGestureAI(()=>{popup.style.display="none"; v.play();});
      if(currentSession==="face") runFaceAI(()=>{popup.style.display="none"; v.play();});
      pauseIndex++;
    }
  };
  v.onended=function(){
    saveHistory(videoMap[currentSession][videoIndex]);
    if(videoIndex<1){ videoIndex++; pauseIndex=0; loadVideo(); v.play(); }
    else { alert("Session completed!"); closeVideo(); }
  };
});
