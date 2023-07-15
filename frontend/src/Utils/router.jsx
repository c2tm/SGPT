import Home from "../components/home/home.jsx";
import Playlist from "../components/playlist/playlist.jsx";

export const router = (routerState, setRouterState, setPlaylistState, playlistState) => {
    if(routerState == "home") {
        return (
            <Home setRouterState={setRouterState} setPlaylistState={setPlaylistState} />
        )
    } else if(routerState == "playlist") {
        return (
            <Playlist setRouterState={setRouterState} playlistState={playlistState} />
        )
    }
}