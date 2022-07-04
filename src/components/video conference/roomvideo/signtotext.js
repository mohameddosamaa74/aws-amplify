import React, { useEffect, useRef } from 'react';
import react from 'react';
import socket from '../socket';
import { Hands } from '@mediapipe/hands';
import * as hands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils/camera_utils';
const SignToText = ({
  textsign,
  signToText,
  user,
  roomId,
  signToTextCaption,
  userVideoAudio
}) => {
  const startSend=useRef(true);
  // const[frames,setFrames]=useState([]);
  let word = '';
  let sentence = '';
  const videoref = useRef();
  const canvasRef = useRef(null);
  // let startSending=true;
  const drawConnectors = window.drawConnectors;
  const drawLandmarks = window.drawLandmarks;
  // eslint-disable-next-line
  var count = 0;
  var frames = [];
  let camera = null;
  function onResults(results) {
    const videoWidth = videoref.current.videoWidth;
    const videoHeight = videoref.current.videoHeight;
    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    // Set canvas width
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
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
      // console.log(count,"count");
        if(startSend.current){
        frames.push(landmarks);
        // console.log(frames.length);
      }
        // console.log(count);
        if (frames.length === 25) {
          socket.emit('stream_sign', {
            landmarks: frames,
            name: user.name,
            roomId,
          });
        startSend.current=false;
        console.log(startSend,"start false")
          console.log(frames.length);
          count = 0;
          frames = [];
        }
        drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
      }
    }
    canvasCtx.restore();
  }

  useEffect(() => {
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
    camera = new cam.Camera(videoref.current, {
      onFrame: async () => {
        await hands.send({ image: videoref.current });
      },
    });
    if (signToText && userVideoAudio.video) {
      camera.start();
      console.log('startCameMediapipe');
    }else{
      camera.stop();
      console.log('stopCameMediapipe');
    }
    // eslint-disable-next-line
  }, [signToText,userVideoAudio.video]);

  useEffect(() => {
    if (signToTextCaption) {
      // recive data from the server
      socket.on('stream_sign', ({ text }) => {
        // eslint-disable-next-line
     startSend.current=true
      console.log(startSend,"start truee")
        // eslint-disable-next-line
        frames = [];
       
        console.log('receive done ', text);
        console.log(text);
        if (text === 'space') {
          // eslint-disable-next-line
          sentence += ' ' + word;
          // eslint-disable-next-line
          word = '';
        } else {
          word += text;
        }
        
        if (textsign.current) {
          if(sentence.length>20){
            
          textsign.current.textContent = sentence.slice(20) + ': ' + word;}
          else{
            textsign.current.textContent = sentence + ': ' + word;
          }

        }
      });
    }
    // eslint-disable-next-line
  }, [signToTextCaption]);
  return (
    <react.Fragment>
       {userVideoAudio.video && signToText && 
        <react.Fragment>
     <video 
        ref={videoref}
        muted
        autoPlay
        playsInline
      ></video>
<canvas muted id="canvas" ref={canvasRef} className="canvas"></canvas></react.Fragment>}
    </react.Fragment>
  );
};
export default SignToText;
