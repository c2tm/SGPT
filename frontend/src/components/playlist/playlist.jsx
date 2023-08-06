import "./playlist.css";
import CustomModal from "../modals/endModal.jsx";

function Playlist({setRouterState, playlistState, accessTokenState, setAccessTokenState, userIdState, setUserIdState, titleState, openModal, setOpenModal, setPlaylistState, setTitleState}) {

    const playlistArray = playlistState.playlist;
    const button = handleSpotifyButtons();

    async function handleSpotifyLogin(event) {
        event.preventDefault();
        event.persist();

        localStorage.setItem("playlistState", JSON.stringify(playlistState));
        localStorage.setItem("titleState", JSON.stringify(titleState));
        
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

    async function handleSpotifyToken(code) {

        if(accessTokenState !== "") {
            return accessTokenState;
        }

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
                return data.access_token;
            }
        }
        return await tryToken();
    }

    async function handleGetUser(token) {

        if(userIdState !== "") {
            return userIdState;
        }

        const tryUser = async () => {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const response = await fetch("https://api.spotify.com/v1/me", options).catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                return data.id;
            }
        }
        return await tryUser();
    }

    async function handleCreatePlaylist(token, userId) {
        const tryCreatePlaylist = async () => {
            let playlistId = "";

            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": titleState,
                    "description": "",
                    "public": false
                })
            }
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, options).catch((err) => console.warn(err));
            if(!response) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                playlistId = data.id;
            }
            
            let songUriArray = [];
            let searchPromises = [];
            for(let i = 0; i < playlistArray.length; i++) {
                const artist = playlistArray[i].artist;
                const name = playlistArray[i].name;
                const searchPromise = (async () => {
                    const options = {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                    const response = await fetch(`https://api.spotify.com/v1/search?q=${name}%20artist=${artist}&type=track&limit=10`, options).catch((err) => console.warn(err));
                    if(!response) {
                        throw new Error('Response was not ok!')
                    } else {
                        const data = await response.json();
                        const searchResults = data.tracks.items;
                        const acceptedResult = searchResults.find((result) => {
                            let bool = false;
                            let artistArray = result.artists;
                            let resultName = result.name;
                            artistArray.forEach((artistResult) => {
                                const resultArtist = artistResult.name;
                                const actualArtist = playlistArray[i].artist;
                                if((actualArtist.includes(resultArtist) || actualArtist == resultArtist) && resultName.includes(name)) {
                                    bool = true;
                                }
                            })
                            return bool;
                        })
            
                        if(acceptedResult) {
                            const spotifyId = acceptedResult.id;
                            const spotifyUri = "spotify:track:" + spotifyId;
                            songUriArray.push(spotifyUri);
                        }
                    }
                })();
                searchPromises.push(searchPromise);
            }

            Promise.all(searchPromises)
            .then(() => {
                const tryAddSongs = async () => {
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            "uris": songUriArray
                        })
                    }
                    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, options).catch((err) => console.warn(err));
                    if(!response) {
                        throw new Error('Response was not ok!')
                    } else {
                        const data = await response.json();
                    }
                }
                tryAddSongs();
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
        }
        tryCreatePlaylist();

        setOpenModal(true);
    }

    async function handleSpotifyIntegration(e, step, code) {
        if(step == 2) {
            try {
                const token = await handleSpotifyToken(code);
                const userId = await handleGetUser(token);
                await handleCreatePlaylist(token, userId);

                // Saves token and userid for future uses
                setAccessTokenState(token);
                setUserIdState(userId);
            } catch (error) {
                console.error('An error occurred during integration:', error);
            }
        } else {
            await handleSpotifyLogin(e);
        }
    }

    function handleSpotifyButtons() {
        const myUrl = new URL(window.location.toLocaleString()).searchParams;
        let content = "Connect to Spotify"
        let step = 1;
        let code = 0;
        if(myUrl.get('code')) {
           content = "Create Playlist"
           step = 2;
           code = myUrl.get('code');
        }

        return (
            <button class="spotify-button" onClick={async (e) => handleSpotifyIntegration(e, step, code)}>{content}</button>
        );
    }

    return (
        <div>
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
        {openModal && <CustomModal openModal={openModal} setOpenModal={setOpenModal} setRouterState={setRouterState} setAccessTokenState={setAccessTokenState} setUserIdState={setUserIdState} setPlaylistState={setPlaylistState} setTitleState={setTitleState} />}
        </div>
    )
}

export default Playlist;