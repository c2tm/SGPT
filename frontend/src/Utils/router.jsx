import Home from "../components/home/home.jsx";
import Playlist from "../components/playlist/playlist.jsx";

export const router = (routerState, setRouterState, setPlaylistState, playlistState, accessTokenState, setAccessTokenState, userIdState, setUserIdState) => {
    if(routerState == "playlist") {
        return (
            <Playlist setRouterState={setRouterState} playlistState={playlistState} accessTokenState={accessTokenState} setAccessTokenState={setAccessTokenState} userIdState={userIdState} setUserIdState={setUserIdState} />
        )
    } else {
        return (
            <Home setRouterState={setRouterState} setPlaylistState={setPlaylistState} />
        )
    }
}