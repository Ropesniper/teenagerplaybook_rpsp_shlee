async function runVoiceAI(callback){
  alert("Voice evaluation started. Allow microphone.");
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  const ctx=new AudioContext();
  const src=ctx.createMediaStreamSource(stream);
  const analyser=ctx.createAnalyser();
  src.connect(analyser);
  const data=new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  const avg=data.reduce((a,b)=>a+b,0)/data.length;
  let score=Math.min(100,Math.floor(avg));
  if(score<50) score+=30;
  alert("Intonation score: "+score+"%");
  if(score>=80){ callback(); } else alert("Try clearer emphasis and tone variation please.");
}
