import react, { Component } from "react";
import "./history.css";
import chat from "../../../img/download.png";

class Dailymeeting extends Component {
  state = {
    meets: [
      {
        id: 1,
        title: "Daily Meeting",
        namehost: "David alba (host)",
        participants: 25,
        img: chat,
        time: "1 hour",
      },
      {
        id: 2,
        title: "Daily Meeting",
        namehost: "David alba (host)",
        participants: 25,
        img: chat,
        time: "1 hour",
      },
      {
        id: 3,
        title: "Daily Meeting",
        namehost: "David alba (host)",
        participants: 25,
        img: chat,
        time: "1 hour",
      },
    ],
  };

  render() {
    return (
      <react.Fragment>
        {this.state.meets.map((meets) => (
          <div key={meets.id} className="dailymeeting">
            <i className="fas fa-ellipsis-h"></i>
            <h4>{meets.title}</h4>
            <ul>
              <li>{meets.namehost}</li>
              <li>{meets.participants}</li>
            </ul>
            <div className="im">
              <img src={meets.img} alt="a" />
              <img src={meets.img} alt="a" />
              <img src={meets.img} alt="a" />
            </div>
            <span>{meets.time}</span>
          </div>
        ))}
      </react.Fragment>
    );
  }
}
export default Dailymeeting;
