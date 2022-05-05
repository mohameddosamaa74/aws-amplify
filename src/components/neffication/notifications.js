import react from "react";
import { Redirect } from "react-router";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
import './notifications.css'
const Notifications = (props) => {
  const tempuser = localStorage.getItem("user");
//   let user = JSON.parse(tempuser);
  if (tempuser === null) {
    return <Redirect to="/" />;
  }
 
  return (
    <react.Fragment>
      <div className="notifications">
        <div className="main-side">
          <Header r={props} />
          <div className="vi">
            <Navbar />
            <div className="vid-stream">
              <h2>Notifications</h2>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};

export default Notifications;
