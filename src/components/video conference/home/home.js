import react from "react";
import React from "react";
import "./home.css";
import Navbar from "../navbar/navbar";
// import { v4 as uuid } from "uuid";
import "../navbar/navbar.css";
import { Redirect } from "react-router";
import Chathome from "./chathome";
import Dailymeeting from "./history";
import Header from "./header.js";
const openchat = () => {
  const icon = document.querySelector(".dots");
  icon.onclick = () => {
    document.querySelector(".lst").classList.toggle("open");
    document.querySelector(".prof").classList.toggle("openhome");
    document.querySelector(".dots").classList.toggle("act");
  };
};
const Home = (props) => {
  const tempuser = localStorage.getItem("user");
  // console.log(tempuser)
  if (tempuser === null) {
    return <Redirect to="/login" />;
  }

  const user= JSON.parse(tempuser);
  return (
    <react.Fragment>
      <div className="home">
        <div className="main-side" id="main">
          <Header r={props} />
          <div className="vi">
            <Navbar />
            <i className="fas fa-comment-dots dots" onClick={openchat}></i>
            <div className="vid-stream">
              <div className="row">
                <div className="col-lg-4">
                  <div className="chh">
                    <Chathome />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="prof">
                    <div className="pic">
                      <img src={user.image} alt="a" />
                    </div>
                    <h3>Meeting history</h3>
                    <div className="history">
                      <Dailymeeting />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};

export default Home;
