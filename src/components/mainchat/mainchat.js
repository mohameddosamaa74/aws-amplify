import react from "react";
import './mainchat.css';
import { Redirect } from "react-router";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
// import i from "../../img/download.png"
import chats from "../../img/download.png"
import girl from '../../img/Girl with PC on zoom meeting 1.png'
import sendmessage from '../../img/Email Send.png'
const Mainchat = (props) => {
  const tempuser = localStorage.getItem("user");
  // console.log(tempuser)
  if (tempuser === null) {
    return <Redirect to="/login" />;
  }
  // const user = JSON.parse(tempuser);
  return (
    <react.Fragment>
        <div className="mainchat">

        <div className="main-side">
        <Header r={props}/>
        <div className="vi">
            <Navbar />
            <div className="vid-stream">
                <div className="contacts">
                <div className="lst">
                  <h1>Contacts</h1>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
           
    
         
                </div>
                </div>
                <div className="chatarea">
                   <img src={girl} alt="icon"/>
                   <p>Now send and recieve message with<br/> your contacts</p>
                   <div className="sendd">
                     <div className="inputmessage">
                       <input type="text"placeholder="Message"/>
                       <i className="fas fa-microphone"></i>
                     </div>
                     <div className="ar">
                       <img src={sendmessage} alt="send"/>
                     </div>
                   </div>
                </div>
                
                </div>
          </div>
          </div></div>
    </react.Fragment>
  );
};
export default Mainchat;
