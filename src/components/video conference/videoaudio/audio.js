import React, { useEffect, useRef } from "react";
import "./roomaudio.css";
const VideoCard = (props) => {
  const ref = useRef();
  const peer = props.peer;
  const img=peer.image;
  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on("track", (track, stream) => {});
  }, [peer]);

  return (
    <React.Fragment>
        <img src={img}alt="s"/>
      <video playsInline autoPlay ref={ref}></video>
      {/* <div className='icon'>
                    <i 
                      className="fas fa-microphone"
                    //   {
                    //     ismutemic
                    //       ? 'fas fa-microphone-slash'
                    //       : 'fas fa-microphone'
                    //   }
                    
                    ></i>
                  </div>
                  <span className='name'>Ahmed salama</span>
                </div> */}
    </React.Fragment>
  );
};

export default VideoCard;
