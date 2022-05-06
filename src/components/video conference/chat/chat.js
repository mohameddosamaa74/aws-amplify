import react from "react";
import "./chat.css";
import React, { useEffect, useState, useRef } from "react";
import socket from "../videochat/socket";
import { Redirect } from "react-router";
const Chat = ({ roomId }) => {
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();
  useEffect(() => {
    socket.on("FE-receive-message", ({ msg, sender,img }) => {
      setMsg((msgs) => [...msgs, { sender, msg,img }]);
    });
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const tempuser = localStorage.getItem("user");

  if (tempuser === null) {
    return <Redirect to="/" />;
  }

  const user = JSON.parse(tempuser);
  // console.log(user);
  const currentUser = user.name;
  const imageuser=user.image;
  // Scroll to Bottom of Message List

  const sendMessage = (e) => {
    const text = document.getElementById("textt");
    const msg = text.value;
    // localStorage.setItem("text",text.value);
    if (msg) {
      socket.emit("BE-send-message", { roomId, msg, sender: currentUser,img:imageuser});
      inputRef.current.value = "";
    }

    console.log("sent");
  };

  return (
    <react.Fragment>
      <div className="chat-side" id="chat">
        <i className="fas fa-sign-out-alt"></i>
        <div className="chat">
          {msg &&
            msg.map(({ sender, msg,img }, idx) => {
              if (sender !== currentUser) {
                return (
                  <div className="sender" key={idx}>
                    <img src={img} alt="a" />

                    <div className="text-box">
                      <strong>{sender} : </strong>
                      <p> {msg}</p>
                      {/*<div className="message-time-left">SMS 13:37</div>*/}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="reciver" key={idx}>
                    {/* <strong>{sender}</strong> */}
                    <div className="text-box">
                      <p>{msg} </p>
                      {/*<div className="message-time-right">SMS 13:37</div>*/}
                    </div>
                  </div>
                );
              }
            })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={messagesEndRef}
          ></div>
        </div>

        <div className="typing">
          <p>
            {/* <span>david </span>is typing.... */}
          </p>
          <div className="textin">
            <div className="feat">
              <i className="fas fa-image"></i>
              {/* <i className="fas fa-microphone"></i> */}
            </div>

            <textarea
              type="text"
              placeholder="Write Message...."
              ref={inputRef}
              id="textt"
            ></textarea>
            <div className="send">
              <i className="fas fa-paper-plane" onClick={sendMessage}></i>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};
export default Chat;
