import react from "react";
import signpic from "../../../img/si.jpeg";
import React, { useEffect, useState } from "react";
import socket from "../socket";
import { useSpeechRecognition } from "react-speech-recognition";
const Signlang = ({ toSign, roomId, user, senderName, text }) => {
  let { transcript, listening } = useSpeechRecognition();
  const [newContent, setnewcontent] = useState("");
  const [isFinished, setisfinished] = useState(true);
  useEffect(() => {
    setnewcontent(transcript);
    // eslint-disable-next-line
  }, [transcript]);
  useEffect(() => {
    if (toSign) {
      console.log(newContent);
      console.log({ isFinished });
      if (isFinished) {
        socket.emit("send-text", {
          data: newContent,
          roomId,
          name: user.name,
        });
        console.log("send text to backend");
        setisfinished(false);
        setnewcontent("");
      }
    }
    // eslint-disable-next-line
  }, [listening]);
  useEffect(() => {
    if (toSign) {
      socket.on("receive-text", ({ data, name }) => {
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
      socket.on("send", () => {
        console.log("finished sending 2");
        setisfinished(true);
        if (newContent.length > 0) {
          socket.emit("send-text", {
            data: newContent,
            roomId,
            name: user.name,
          });
          setisfinished(false);
          setnewcontent("");
        }
      });
      // recive data from the server
      socket.on("receive-frame", ({ buffer }) => {
        console.log("received frame from backend");
        document.getElementById("stream_asl_v").src =
          "data:image/jpeg;base64," + arrayBufferToBase64(buffer);
      });
      const arrayBufferToBase64 = (buffer) => {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };
    }
    // eslint-disable-next-line
  }, [toSign]);
  return (
    <react.Fragment>
      <img id="stream_asl_v" alt="ss" src={signpic} className="signvid" />
    </react.Fragment>
  );
};
export default Signlang;
