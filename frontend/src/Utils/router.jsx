import Home from "../components/home/home.jsx";
import Playlist from "../components/playlist/playlist.jsx";

export const router = (routerState, setRouterState, setPlaylistState, playlistState, accessTokenState, setAccessTokenState, userIdState, setUserIdState, titleState, setTitleState, openModal, setOpenModal) => {
    if(routerState == "playlist") {
        return (
            <Playlist setRouterState={setRouterState} 
            playlistState={playlistState} setPlaylistState={setPlaylistState}
            accessTokenState={accessTokenState} setAccessTokenState={setAccessTokenState} 
            userIdState={userIdState} setUserIdState={setUserIdState} 
            titleState={titleState} setTitleState={setTitleState}
            openModal={openModal} setOpenModal={setOpenModal}/>
        )
    } else {
        return (
            <Home setRouterState={setRouterState} setPlaylistState={setPlaylistState} setTitleState={setTitleState}/>
        )
    }
}