import react, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./chathome.css";
import chat from "../../../img/download.png";
class Chathome extends Component {
  state = {
    chats: [
      { id: 1, img: chat, time: "12:32", type: "" },
      { id: 2, img: chat, time: "12:32" },
      { id: 3, img: chat, time: "12:32" },
      { id: 4, img: chat, time: "12:32" },

    ],
  };

  render() {
    return (
      <react.Fragment>
        <div className="lst">
          <Tabs defaultActiveKey="Direct" id="uncontrolled-tab-example">
            <Tab eventKey="Direct" title="Direct">
              {this.state.chats.map((chats) => (
                <div key={chats.id} className="cont">
                  <img src={chats.img} alt="a" />
                  <span>{chats.time}</span>
                </div>
              ))}
            </Tab>
            <Tab eventKey="Group" title="Group">
              {this.state.chats.map((chats) => (
                <div key={chats.id} className="cont">
                  <img src={chats.img} alt="a" />
                  <span>{chats.time}</span>
                </div>
              ))}
            </Tab>
            <Tab eventKey="Archive" title="Archive">
              {this.state.chats.map((chats) => (
                <div key={chats.id} className="cont">
                  <img src={chats.img} alt="a" />
                  <span>{chats.time}</span>
                </div>
              ))}
            </Tab>
          </Tabs>
        </div>
      </react.Fragment>
    );
  }
}
export default Chathome;
