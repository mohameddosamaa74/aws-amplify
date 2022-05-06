// import react from "react";
// import signpic from '../../../img/si.jpeg';
// import React, { useEffect, useRef } from "react";
// import socket from "../videochat/socket";
// const Signlang = (props,{text}) => {
//     const SpeechRecognition =
//     window.speechRecognition || window.webkitSpeechRecognition;
//   const SpeechGrammarList =
//     window.speechGrammarList || window.webkitSpeechGrammarList;

//   const grammar = '#JSGF V1.0';
//   const speechRecognition = new SpeechRecognition();
//   const speechGrammarList = new SpeechGrammarList();

//  text = useRef();
//   let newContent = useRef('');
//   let isFinished = useRef(true);

//     speechGrammarList.addFromString(grammar);
//     speechRecognition.grammars = speechGrammarList;
//     speechRecognition.continuous = true;
//     speechRecognition.lang = 'en-US';
//     speechRecognition.onresult = (event) => {
//       if (event.results.length) {
//         let current = event.resultIndex;
//         let transcript = event.results[current][0].transcript;

//         newContent.current += transcript;
//         console.log({ isFinished });
//         if (isFinished) {
//           socket.emit('send-text', { data: newContent.current, roomId:props.roomId });
//           console.log('send text to backend');
//           isFinished.current = false;
//           newContent.current = '';
//         }
//       }
//     };

//     socket.on('receive-text', ({ data }) => {
//       console.log({ data });
//       if (text.current) {
//         text.current.textContent = data;
//       }
//     });

//     socket.on('send', () => {
//       console.log('finished sending 2');
//       isFinished.current = true;
//       if (newContent.current.length > 0) {
//         socket.emit('send-text', { data: newContent.current,roomId:props.roomId });
//         isFinished.current = false;
//         newContent.current = '';
//       }
//     });

//     // recive data from the server
//     socket.on('receive-frame', ({ frame }) => {
//       console.log('received frame from backend');
//       document.getElementById('stream_asl').src =
//         'data:image/jpeg;base64,' + frame;
//     });
//   return (
//     <react.Fragment>
//          <img id='stream_asl' alt='ss' src={signpic} />
//     </react.Fragment>
//   );
// };
// export default Signlang;
