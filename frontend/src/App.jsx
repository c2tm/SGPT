import { useState, useEffect } from 'react'
import Body from './components/body/body'
import Nav from './components/nav/nav'
import './App.css'

export const serverURL = import.meta.env.VITE_SERVER_URL;

function App() {

  const [routerState, setRouterState] = useState('home');
  const [playlistState, setPlaylistState] = useState({});
  const [accessTokenState, setAccessTokenState] = useState('');
  const [userIdState, setUserIdState] = useState('');
  const [titleState, setTitleState] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("playlistState")) {
     const playlist = localStorage.getItem("playlistState");
     const title = localStorage.getItem("titleState");
    //  localStorage.removeItem('playlistState');
     setPlaylistState(JSON.parse(playlist));
     setTitleState(JSON.parse(title));
     setRouterState("playlist");
    }
 },[]);

  return (
    <>
      <div id="app-container">
        <Nav routerState={routerState} setRouterState={setRouterState} 
        playlistState={playlistState} setPlaylistState={setPlaylistState} 
        accessTokenState={accessTokenState} setAccessTokenState={setAccessTokenState} 
        userIdState={userIdState} setUserIdState={setUserIdState}
        titleState={titleState} setTitleState={setTitleState}
        openModal={openModal} setOpenModal={setOpenModal} />
        <Body routerState={routerState} setRouterState={setRouterState} 
        playlistState={playlistState} setPlaylistState={setPlaylistState} 
        accessTokenState={accessTokenState} setAccessTokenState={setAccessTokenState} 
        userIdState={userIdState} setUserIdState={setUserIdState}
        titleState={titleState} setTitleState={setTitleState}
        openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      
    </>
  )
}

export default App
