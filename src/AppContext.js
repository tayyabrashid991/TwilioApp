import * as React from 'react';
import Video from "twilio-video";

export const AppContext = React.createContext();

export const AppContextProvider = ({children}) => {
    const [room,setRoom] = React.useState(null);

    const joinRoom = async (identity) => {
        const response = await fetch('/video/token',{
          method: "POST",
          body: JSON.stringify({
            identity: identity,
            room: 'Chat room',
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        Video.connect(response.token,{
          name:'Chat room'
        })
        .then((room) => {
            setRoom(room);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    const defaultContext = {
        joinRoom,
        setRoom,
        room,
    }
    return(
        <AppContext.Provider value={defaultContext}>
            {children}
        </AppContext.Provider>
    )
 }