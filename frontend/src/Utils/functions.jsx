export const clearUrl = () => {
    let baseUrl = window.location.href.split("?")[0];
    window.history.pushState('name', '', baseUrl);
}

export const clearState = (setOpenModal, setPlaylistState, setTitleState, setRouterState, setAccessTokenState, setUserIdState) => {
    setTitleState('');
    setUserIdState('');
    setAccessTokenState('');
    setPlaylistState({});
    setOpenModal(false);
    setRouterState('home');
}

export const clearStorage = (keys) => {
    for(let i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i]);
    }
}

export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}