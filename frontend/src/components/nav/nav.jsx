import "./nav.css";
import { clearState, clearStorage, clearUrl } from '../../Utils/functions.jsx';

function Nav({routerState, setRouterState, setOpenModal, setPlaylistState, setTitleState, setAccessTokenState, setUserIdState}) {

    function handleResetApp() {
        clearUrl();
        clearStorage([
            'titleState', 'playlistState'
        ]);
        clearState(setOpenModal, setPlaylistState, setTitleState, setRouterState, setAccessTokenState, setUserIdState);
    }

    function handleLink(location) {
        if(location == "home") {
            handleResetApp();
        }
        setRouterState(location)
    }

    return (
        <nav>
            <ul>
                <li><a href="#" onClick={() => handleLink("home")}>SGPT</a></li>
            </ul>
        </nav>
    )
}

export default Nav;