import Home from "../components/home/home.jsx";
import Playlist from "../components/playlist/playlist.jsx";

export const router = (routerState, setRouterState) => {
    if(routerState == "home") {
        return (
            <Home setRouterState={setRouterState} />
        )
    } else if(routerState == "playlist") {
        return (
            <Playlist setRouterState={setRouterState} />
        )
    }
}