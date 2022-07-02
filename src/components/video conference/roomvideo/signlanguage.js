import react from 'react';
import signpic from '../../../img/sign.jpg';
import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { useSpeechRecognition } from 'react-speech-recognition';
const Signlang = ({ roomId, user, senderName, text }) => {
  // eslint-disable-next-line
  let { transcript, listening } = useSpeechRecognition();
  const [newContent, setnewcontent] = useState('');
  const [enablef1, setenablef1] = useState(false);
  const [isFinished, setisfinished] = useState(true);
  useEffect(() => {
    socket.on('enable-f1-to-all', () => {
      setenablef1(true);
    });
    socket.on('disable-f1-to-all', () => {
      setenablef1(false);
    });
    console.log(enablef1);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setnewcontent(transcript);
    // eslint-disable-next-line
  }, [transcript]);
  useEffect(() => {
    if (enablef1) {
      if (newContent.length > 0) {
        console.log(newContent);
        console.log({ isFinished });
        if (isFinished) {
          socket.emit('send-text', {
            data: newContent,
            roomId: roomId + 'voicetosign',
            name: user.name,
          });
          console.log('send text to backend');
          setisfinished(false);
          setnewcontent('');
        }
      }
    }
    // eslint-disable-next-line
  }, [enablef1, listening]);
  useEffect(() => {
    if (enablef1) {
      console.log('asdadadada');
      socket.on('receive-text', ({ data, name }) => {
        console.log({ data });
        if (text.current) {
          text.current.textContent = data;
          //   settextcaption(data)
        }
        if (senderName.current) {
          senderName.current.textContent = name;
          console.log(senderName.current.textContent);
        }
      });
      socket.on('send', () => {
        console.log('finished sending 2');
        setisfinished(true);
        if (newContent.length > 0) {
          socket.emit('send-text', {
            data: newContent,
            roomId: roomId + 'voicetosign',
            name: user.name,
          });
          setisfinished(false);
          setnewcontent('');
        }
      });
      // recive data from the server
      socket.on('receive-frame', ({ buffer }) => {
        console.log('received frame from backend');
        document.getElementById('stream_asl_v').src =
          'data:image/jpeg;base64,' + arrayBufferToBase64(buffer);
      });
      const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };
    }
    // eslint-disable-next-line
  }, [enablef1]);
  return (
    <react.Fragment>
      <img id="stream_asl_v" alt="ss" src={signpic} className="signvid" />
    </react.Fragment>
  );
};
export default Signlang;
