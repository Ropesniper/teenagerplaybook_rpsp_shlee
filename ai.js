async function runAI(type){
alert("Exercise started. Allow microphone & camera.");


const stream = await navigator.mediaDevices.getUserMedia({ audio:true, video:true });


// Voice analysis (basic example)
const audioContext = new AudioContext();
const source = audioContext.createMediaStreamSource(stream);
const analyser = audioContext.createAnalyser();
source.connect(analyser);


// Gesture / expression placeholder (AI-ready)
console.log("AI evaluating", type);


// Simulated score (replace with real ML later)
let score = Math.floor(Math.random()*40)+60;


alert("Your performance score: " + score + "%");


if(score >= 80){
document.getElementById("sessionVideo").play();
}else{
alert("Try again to reach 80%+");
}
}
