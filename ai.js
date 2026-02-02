async function runAI(type){
alert("Allow microphone & camera for evaluation.");


const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});


// Voice intensity analysis (basic)
const ctx = new AudioContext();
const src = ctx.createMediaStreamSource(stream);
const analyser = ctx.createAnalyser();
src.connect(analyser);


const data = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(data);
const avg = data.reduce((a,b)=>a+b,0)/data.length;


let score = Math.min(100, Math.floor(avg));
if(score<60) score+=20; // normalization


alert("Performance score: " + score + "%");


if(score>=80){
document.getElementById("player").play();
}else{
alert("Try again to reach 80%+");
}
}
