import './body.css'
import { router } from '../../Utils/router';

function Body({routerState, setRouterState, setPlaylistState, playlistState, accessTokenState, setAccessTokenState, userIdState, setUserIdState, titleState, setTitleState, openModal, setOpenModal}) {

    let content = router(routerState, setRouterState, setPlaylistState, playlistState, accessTokenState, setAccessTokenState, userIdState, setUserIdState, titleState, setTitleState, openModal, setOpenModal);

    return (
        <div className='body-container'>
            {content}
        </div>
    )
}

export default Body;