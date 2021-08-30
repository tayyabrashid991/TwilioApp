import * as React from 'react';
import Participant  from './Participant';
import './App.scss';

export const Room = ({room,handleLogout}) => {
    const [participants,setParticipants] = React.useState([]);

    React.useEffect(() => {
        
        const participantConnected = (participant) => {
            setParticipants((prevParticipants) => [...prevParticipants, participant]);
          };
      
        const participantDisconnected = (participant) => {
        setParticipants((prevParticipants) =>
            prevParticipants.filter((p) => p !== participant)
        );
        };

        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
        return () => {
            room.off("participantConnected", participantConnected);
            room.off("participantDisconnected", participantDisconnected);
          };
    },[room]);
    
    const remoteParticipants = participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ));
    return(
        <>
            <h2>Chat Room</h2>
            <div className="room-wrap">
                {room ? (
                <Participant
                    key={room.localParticipant.sid}
                    participant={room.localParticipant}
                    handleLogout={handleLogout}
                />
                ) : ''}
                <div className="remote-participants">{remoteParticipants}</div>
            </div>
        </>
    )
};
