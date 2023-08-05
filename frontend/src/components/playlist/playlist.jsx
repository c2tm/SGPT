import "./playlist.css";

function Playlist({setRouterState, playlistState, accessTokenState, setAccessTokenState, userIdState, setUserIdState}) {

    const playlistArray = playlistState.playlist;
    const button = handleSpotifyButtons();
    console.log(playlistArray);

    function handleSpotifyLogin(event) {
        event.preventDefault();
        event.persist();

        localStorage.setItem("playlistState", JSON.stringify(playlistState));
        
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

    function handleSpotifyToken(e, code) {

        console.log(code);
        const tryToken = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                })
            }
            const response = await fetch("http://127.0.0.1:8000/api/v1/sgpt/token", options).catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                console.log(data);
                setAccessTokenState(data.access_token);
            }
        }
        tryToken();

    }

    function handleGetUser() {
        const tryUser = async () => {
            const options = {
                headers: {
                    Authorization: `Bearer ${accessTokenState}`,
                },
            }
            const response = await fetch("https://api.spotify.com/v1/me", options).catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                console.log(data);
                setUserIdState(data.id);
            }
        }
        tryUser();
    }

    function handleCreatePlaylist() {
        const tryCreatePlaylist = async () => {
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessTokenState}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": "Test",
                    "description": "New playlist description",
                    "public": false
                })
            }
            const response = await fetch(`https://api.spotify.com/v1/users/${userIdState}/playlists`, options).catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                console.log(data);
            }

            for(let i = 0; i < playlistArray.length; i++) {
                const artist = playlistArray[i].artist;
                const artistEncoded = artist.replace(" ", "%20");
                const name = playlistArray[i].name;
                const nameEncoded = name.replace(" ", "%20");
                const query = `q=${JSON.stringify(`track:${nameEncoded}%20artist:${artistEncoded}`)}`;
    
                const trySearchSong = async () => {
                    const options = {
                        headers: {
                            Authorization: `Bearer ${accessTokenState}`,
                        },
                    }
                    const response = await fetch(`https://api.spotify.com/v1/search?${query}&type=track`, options).catch((err) => console.warn(err));
                    if(!response) {
                        throw new Error('Response was not ok!')
                    } else {
                        const data = await response.json();
                        console.log(data);
                    }
                }
                trySearchSong();
            }
        }
        tryCreatePlaylist();
    }

    function handleSpotifyButtons() {
        const myUrl = new URL(window.location.toLocaleString()).searchParams;
        if(userIdState !== "") {
            return (
                <button onClick={handleCreatePlaylist}>Create Playlist</button>
            );
        } else if(accessTokenState !== "") {
            return (
                <button onClick={handleGetUser}>Get User</button>
            );
        } else if(myUrl.get('code')) {
            const code = myUrl.get('code');
            return (
                <button onClick={(e) => handleSpotifyToken(e, code)}>Get Token</button>
            );
        } else {
            return (
                <button onClick={handleSpotifyLogin}>Connect to spotify</button>
            );
        }
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
            {button}
        </div>
    )
}

export default Playlist;