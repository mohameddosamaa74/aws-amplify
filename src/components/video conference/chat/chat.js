import react from 'react';
import './chat.css';
import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import { Redirect } from 'react-router';
const Chat = ({ roomId }) => {
  const [msg, setMsg] = useState([]);
  const [inputImage, setinputImage] = useState('');
  const [imageSended, setimageSended] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    socket.on('FE-receive-message', ({ msg, sender, img ,inputImage}) => {
      console.log({ msg, sender, img });
      setMsg((msgs) => [...msgs, { sender, msg, img,inputImage }]);
    });
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const tempuser = localStorage.getItem('user');

  if (tempuser === null) {
    return <Redirect to="/" />;
  }

  const user = JSON.parse(tempuser);
  // console.log(user);
  const currentUser = user.name;
  const imageuser = user.image;
  // Scroll to Bottom of Message List

  const sendMessage = (e) => {
    setimageSended(true);
    const text = document.getElementById('textt');
    const msg = text.value;

    // localStorage.setItem("text",text.value);
    if (msg ||inputImage) {
      console.log(msg, inputImage);
      // console.log({ socket: socket });
      // console.log({ roomId, msg, sender: currentUser, img: imageuser });
      socket.emit('BE-send-message', {
        roomId,
        msg,
        inputImage,
        sender: currentUser,
        img: imageuser,
      });
      inputRef.current.value = '';
    }
    console.log('sent');
  };
  //   if(msgpic){
  //   useEffect(()=>{
  //       setMsg(msgpic)
  //   },[msgpic])
  // }
  function importData() {
    let input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      setimageSended(false)
      let file = e.target.files[0];
      // const formData = new FormData();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // console.log(reader.result);
        setinputImage(reader.result);
      };
      // formData.append('image', file, file.name);
      // setMsgpic(file);
      // // setImage(file);
      // console.log(file);

      // const text = document.getElementById('textt');
    };

    input.click();
  }
  const deleteImg =()=>{
    setimageSended(true)
    setinputImage('')
    console.log(inputImage)
    console.log(imageSended)
  }
  console.log(inputImage)
  console.log(imageSended)
  return (
    <react.Fragment>
      <div className="chat-side" id="chat">
        <i className="fas fa-sign-out-alt"></i>
        <div className="chat">
          {msg &&
            msg.map(({ sender, msg, img ,inputImage}, idx) => {
              if (sender !== currentUser) {
                return (
                  <div className="sender" key={idx}>
                    <img src={img} alt="a" />
                    <div className="text-box">
                      <strong>{sender} : </strong>
                       {inputImage!==''&&<img className='img-inbox' src={inputImage}alt="g"/>}
                      <p>{msg} </p>
                      {/*<div className="message-time-left">SMS 13:37</div>*/}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="reciver" key={idx}>
                    {/* <strong>{sender}</strong> */}
                    <div className="text-box">
                    {inputImage!==''&&<img className='img-inbox' src={inputImage}alt="g"/>}
                      <p>{msg} </p>
                      {/*<div className="message-time-right">SMS 13:37</div>*/}
                    </div>
                  </div>
                );
              }
            })}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={messagesEndRef}
          ></div>
        </div>

        <div className="typing">
          <p>{/* <span>david </span>is typing.... */}</p>
          <div className="textin">
            <div className="feat">
              <i className="fas fa-image" id="imggg" onClick={importData}></i>

              {/* <i className="fas fa-microphone"></i> */}
            </div>
            {inputImage !== '' && !imageSended && (
            <div className='info-imagee'>  
              <i className='fas fa-times' onClick={deleteImg}></i>
              <img className="sended-image" src={inputImage} alt="fj"/>
            </div>
              )}
            <textarea
              type="text"
              placeholder="Write message...."
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
