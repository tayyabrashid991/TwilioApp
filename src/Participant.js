import * as React from "react";

const Participant = ({ participant, handleLogout, muteCall }) => {
  const [videoTracks, setVideoTracks] = React.useState([]);
  const [audioTracks, setAudioTracks] = React.useState([]);

  const [muted,setMuted] = React.useState(false);

  const videoRef = React.useRef();
  const audioRef = React.useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  React.useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);
  
  React.useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  React.useEffect(() => {
      console.log(audioTracks)
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const isMuted = () => {
      if(!muted){
          audioTracks[0].detach();
          setMuted(true);
      }else{
        audioTracks[0].attach(audioRef.current);
        setMuted(false);
      }
  }
  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <div className="video-wrap">
        <video ref={videoRef} autoPlay={true} muted={true}/>
        <audio ref={audioRef} autoPlay={true} muted={muted}/>
      </div>
      <div className="btn-wrap">
      <button onClick={handleLogout}>Leave Room</button>
      <button onClick={isMuted}>{muted ? 'Unmute' : 'Mute'}</button>
      </div>
    </div>
  );
};

export default Participant;