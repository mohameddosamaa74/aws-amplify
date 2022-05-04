import react from "react";
import { Redirect } from "react-router";
import './screenrecord.css'
import { useReactMediaRecorder } from "react-media-recorder";
const ScreeenRecord = (props) => {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  const tempuser = localStorage.getItem("user");
//   let user = JSON.parse(tempuser);
  if (tempuser === null) {
    return <Redirect to="/" />;
  }

  
  return (
    <react.Fragment>
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
    </react.Fragment> 
  );
};

export default ScreeenRecord ;
