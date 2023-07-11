// import { router } from "../../Utils/functions.jsx";
import "./nav.css";

function Nav({routerState, setRouterState}) {

    function handleLink(location) {
        setRouterState(location)
    }

    return (
        <nav>
            <ul>
                <li><a href="#" onClick={() => handleLink("home")}>Home</a></li>
                <li><a>Test</a></li>
                <li><a>Test</a></li>
                <li><a>Test</a></li>
            </ul>
        </nav>
    )
}

export default Nav;