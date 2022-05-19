import React, { useEffect, useRef } from 'react';
import react from 'react';
import socket from '../socket';
import { Hands } from '@mediapipe/hands';
import * as hands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
const SignToText = ({ textsign, signcheckCap, signToText, user, roomId }) => {
  let word = '';
  let sentence = '';
  const videoref = useRef();
  const canvasRef = useRef(null);
  const drawConnectors = window.drawConnectors;
  const drawLandmarks = window.drawLandmarks;
  // eslint-disable-next-line
  var count = 0;
  // eslint-disable-next-line
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
        frames.push(landmarks);
        // console.log(count);
        if (frames.length === 15) {
          socket.emit('stream_sign', {
            landmarks: frames,
            name: user.name,
            roomId,
          });
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
    if (signToText) {
      // document.getElementById("au").setAttribute("disabled", "disabled")
      // // document.getElementById("auo").style.pointerEvents="none";
      // // document.getElementById("auf").style.pointerEvents="none";
      // document.getElementById("au").style.opacity="0.5"
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
      camera = new cam.Camera(videoref.current, {
        onFrame: async () => {
          await hands.send({ image: videoref.current });
        },
      });
      camera.start();
      // recive data from the server
      socket.on('stream_sign', ({ text }) => {
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
          textsign.current.textContent = sentence.slice(20) + ': ' + word;
        }
      });
    }
    // eslint-disable-next-line
  }, [signToText]);
  // useEffect(()=>{
  //   if(signcheckCap){

  //   }
  // // eslint-disable-next-line
  // },[signcheckCap,textsign])
  return (
    <react.Fragment>
      <video
        ref={videoref}
        muted
        autoPlay
        playsInline
        style={{ display: 'none' }}
      ></video>
      <canvas
         muted
      id="canvas" ref={canvasRef} className="canvas"></canvas>
    </react.Fragment>
  );
};
export default SignToText;
