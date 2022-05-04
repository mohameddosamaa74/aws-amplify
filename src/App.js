import react, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import NOT from "./components/notfound";
import Form from "./components/form/form";
import Room from "./components/video conference/videochat/room";
import Home from "./components/video conference/home/home";
import Setting from "./components/setting/setting";
// import Jis from "./components/jitsi";
import Mainchat from "./components/mainchat/mainchat";
import Calendarr from "./components/calendar/calendar";
import Notifications from "./components/neffication/notifications";
import ScreeenRecord from "./components/video conference/videochat/screenrecord";
// import Navbar from "./components/video conference/navbar/navbar";
// import Signlang from "./components/video conference/videochat/signlanguage";
class App extends Component {
  render() {
    return (
      <react.Fragment>
        <Switch> 
          <Route exact path="/" component={Form} />
          <Route path="/room/:roomId" component={Room} />
          <Route path="/home" component={Home} />
          <Route path="/setting" component={Setting} />
          <Route path="/mainchat" component={Mainchat} />
          <Route path="/calendar" component={Calendarr} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/screen" component={ScreeenRecord} />
          {/* <Route path="/nav" component={Navbar} />
          <Route path="/jis" component={Jis} />
          <Route path="/s" component={Signlang} /> */}
          <Route path="/notfound" component={NOT} />
          {/* <Redirect from="/form" to="/" /> */}
          <Redirect to="/notfound" />
        </Switch>
      </react.Fragment>
    );
  }
}

export default App;
