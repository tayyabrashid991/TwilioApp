import './App.scss';
import * as React from 'react';
import { Room } from './Room';
import { AppContext } from './AppContext';


export const App = () => {
    const [identity,setIdentity] = React.useState('');
    const {joinRoom,room,setRoom} = React.useContext(AppContext);
    const joinChatRoom = async () => {
        const room = await joinRoom(identity);
        if(room){
          console.log('room joint')
        }
    }
    const handleLogout = () => {
      setRoom((prevRoom) => {
        if (prevRoom) {
          prevRoom.localParticipant.tracks.forEach((trackPub) => {
            trackPub.track.stop();
          });
          prevRoom.disconnect();
        }
    })
  };
  React.useEffect(() => {
    
  },[room])
  return(
    <>
        <div className="app">
          {room &&
            <Room handleLogout={handleLogout} room={room}/>
          }
          {!room &&
            <div className="lobby">
            <input 
              placeholder="What's your name?"
              onChange={(e) => setIdentity(e.target.value)}
                          value={identity}/>
          <button onClick={joinChatRoom}>Join Room</button>
        </div>
          }
    </div>
    </>
  )
}

export default App;

