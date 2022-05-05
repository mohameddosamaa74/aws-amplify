import react from "react";
import React from "react";
import "./header.css";
import { v4 as uuid } from "uuid";
import "../navbar/navbar.css";
import { Redirect } from "react-router";
import logo from "../../../img/MicrosoftTeams-image4) 1.png";
const Header = (props) => {
  const tempuser = localStorage.getItem("user");
  // console.log(tempuser)
  if (tempuser === null) {
    return <Redirect to="/" />;
  }
  const user = JSON.parse(tempuser);
  // console.log(user)
  function clickJoinVideo() {
    const id = uuid();
    props.r.history.push(`/roomVideo/${id}`);
    // console.log()
  }
  function clickJoinAudio() {
    const id = uuid();
    props.r.history.push(`/roomAudio/${id}`);
    // console.log()
  }
  return (
    <react.Fragment>
      <div className="head">
        <div className="navbar">
      <div className="logandtit">
            <div className="logo">
              <img src={logo} alt="d" />
            </div>
            <div className="title">
            <div className="ser">
              <input type="search" placeholder="search" />
              <i className="fas fa-search"></i>
              </div>
              <i className="fas fa-phone-alt"onClick={clickJoinAudio}></i>
              <i className="fas fa-video" onClick={clickJoinVideo}></i>
            </div>
            </div>
            <div className="grid-show">
             
              <img src={user.image} alt="a" /> <span>{user.name}</span>
            
            
            </div>
         
        </div>
      </div>
    </react.Fragment>
  );
};
export default Header;
