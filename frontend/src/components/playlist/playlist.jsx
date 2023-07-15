import "./playlist.css";

function Playlist({setRouterState, playlistState}) {

    const playlistArray = playlistState.playlist;
    console.log(playlistArray);

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
        </div>
    )
}

export default Playlist;