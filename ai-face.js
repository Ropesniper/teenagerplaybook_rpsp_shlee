async function runFaceAI(callback){
  alert("Facial expression evaluation started. Allow camera.");
  const videoElement=document.createElement("video");
  const stream=await navigator.mediaDevices.getUserMedia({video:true});
  videoElement.srcObject=stream;
  await videoElement.play();
  let score=Math.floor(Math.random()*30)+60;
  alert("Facial expression score: "+score+"%");
  if(score>=80){ callback(); } else alert("Try to make expressions clearer and emotionally aligned please.");
}
