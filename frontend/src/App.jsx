import { useState, useEffect } from 'react'
import Body from './components/body/body'
import Nav from './components/nav/nav'
import './App.css'

function App() {

  const [routerState, setRouterState] = useState('home');
  const [playlistState, setPlaylistState] = useState({});
  const [accessTokenState, setAccessTokenState] = useState('');
  const [userIdState, setUserIdState] = useState('');

  useEffect(() => {
    if(localStorage.getItem("playlistState")) {
     const playlist = localStorage.getItem("playlistState");
    //  localStorage.removeItem('playlistState');
     setPlaylistState(JSON.parse(playlist));
     setRouterState("playlist");
    }
 },[]);

  return (
    <>
      <div id="app-container">
        <Nav routerState={routerState} setRouterState={setRouterState} />
        <Body routerState={routerState} setRouterState={setRouterState} playlistState={playlistState} setPlaylistState={setPlaylistState} accessTokenState={accessTokenState} setAccessTokenState={setAccessTokenState} userIdState={userIdState} setUserIdState={setUserIdState} />
      </div>
      
    </>
  )
}

export default App
