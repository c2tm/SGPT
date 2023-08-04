import "./playlist.css";

function Playlist({setRouterState, playlistState}) {

    const playlistArray = playlistState.playlist;
    console.log(playlistArray);

    function handleSpotifyLogin(event) {
        event.preventDefault();
        event.persist();
        
        const tryLogin = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/v1/sgpt/login").catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                window.location.href = data.url;
            }
        }
        tryLogin();
    }

    return (
        <div className="playlist-container" id="playlist-container">
            <div className="playlist">
                {playlistArray.map(song => (
                    <div className="song">
                        <div>{song.name}</div>
                        <div>{song.artist}</div>
                    </div>
                ))}
            </div>
            <button onClick={handleSpotifyLogin}>Connect to spotify</button>
        </div>
    )
}

export default Playlist;