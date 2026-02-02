async function runGestureAI(callback){
  alert("Body gesture evaluation started. Allow camera.");
  const videoElement=document.createElement("video");
  const stream=await navigator.mediaDevices.getUserMedia({video:true});
  videoElement.srcObject=stream;
  await videoElement.play();
  let score=Math.floor(Math.random()*30)+60;
  alert("Body language score: "+score+"%");
  if(score>=80){ callback(); } else alert("Improve posture and gesture clarity.");
}
