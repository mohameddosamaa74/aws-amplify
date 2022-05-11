import React, { useEffect,useRef, useState} from "react";
import react from "react";
import socket from "../socket";
import { Hands } from "@mediapipe/hands"; 
import * as hands from "@mediapipe/hands"; 
import * as cam from "@mediapipe/camera_utils";
const SignToText = ({textsign,uservideo,signToText,user,roomId}) => {
  let word='';
  let sentence='';
    const canvasRef = useRef(null);
    const drawConnectors = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    var count = 0;
    var frames = [];
    let camera=null
    // eslint-disable-next-line
    const [came,setcame]=useState('')
    function onResults(results) {
      const videoWidth = uservideo.current.videoWidth;
      const videoHeight = uservideo.current.videoHeight;
      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // Set canvas width
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          // console.log(landmarks)
          count++;
          frames.push(landmarks);
          // console.log(count);
          if (count === 20) {
              socket.emit("stream_sign", {landmarks:frames,name:user.name,roomId});
              console.log(frames.length);
              count = 0;
              frames=[];
          }
          drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
        }
      }
      canvasCtx.restore();
    }
    // useEffect(()=>{
    //   if(signToText){
    //     setcame("start")
    //   }
    //   if(!signToText){
    //     setcame("stop")
    //   }
    // },[signToText,came])

  useEffect(() => {
    if(signToText){
      document.getElementById("au").setAttribute("disabled", "disabled")
      // document.getElementById("auo").style.pointerEvents="none";
      // document.getElementById("auf").style.pointerEvents="none";
      document.getElementById("au").style.opacity="0.5"
      // document.getElementById("auf").setAttribute("disabled", "disabled")
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      selfieMode: true,
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);
    
      // eslint-disable-next-line 
      camera = new cam.Camera(uservideo.current, { 
        onFrame: async () => {
          await hands.send({ image: uservideo.current});
        }
        
      });
      camera.start()
     // recive data from the server
socket.on("stream_sign", ({text})=>{
    console.log('receive done ', text);
    console.log(text)
    if(text==="space"){
      // eslint-disable-next-line 
      sentence+= " "+word
      // eslint-disable-next-line 
      word=''

    }
    else{
      word+=text
    }

  if (textsign.current) {
    textsign.current.textContent = sentence.slice(20) +": "+word;
  }
  });

}
    if(!signToText){
      // setcame("stop")
      console.log("end")
      document.getElementById("au").removeAttribute("disabled")
      // document.getElementById("auo").style.pointerEvents="auto";
      // document.getElementById("auf").style.pointerEvents="auto";
      document.getElementById("au").style.opacity="1"
 
    }
   // eslint-disable-next-line
  }, [signToText]);

  return (
    <react.Fragment>
       <canvas id='canvas' ref={canvasRef} className="canvas"></canvas>
    </react.Fragment>
  );
};
export default SignToText;
