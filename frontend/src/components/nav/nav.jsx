// import { router } from "../../Utils/functions.jsx";
import "./nav.css";

function Nav({routerState, setRouterState}) {

    function handleLink(location) {
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