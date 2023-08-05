import "./home.css";
import LoadingDots from '../graphics/loadingdots.jsx';
import { useEffect } from "react";

function Home({setRouterState, setPlaylistState}) {

    function handleSubmit(event) {
        event.preventDefault();
        event.persist();
        const input = document.getElementById("prompt").value;
        showLoadingDots();
        
        const fetchPlaylist = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: 1,
                    user: 'test',
                    input: input,
                })
            }
            const response = await fetch("http://127.0.0.1:8000/api/v1/sgpt/playlist", options).catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                const dataDecoded = JSON.parse(data);
                setPlaylistState(dataDecoded);
                setRouterState('playlist');
            }
        }
        fetchPlaylist();
    }

    function showLoadingDots() {
        const loadingDots = document.getElementById("loadingdots-container");
        loadingDots.style.visibility = "visible";
    }

    const formHTML = (
        <form onSubmit={handleSubmit}>
            <input type="text" id="prompt" name="prompt" placeholder="What type of playlist are you looking for?" autoComplete="off"/>
            {/* <button type="submit">Submit</button> */}
            <LoadingDots />
        </form>
    )

    return (
        <div className="homepage-container">
            {formHTML}
        </div>
    )
}

export default Home;