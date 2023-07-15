import { useEffect } from 'react'
import { router } from '../../Utils/router';

function Body({routerState, setRouterState, setPlaylistState, playlistState}) {

    let content = router(routerState, setRouterState, setPlaylistState, playlistState);

    return (
        <div>
            {content}
        </div>
    )
}

export default Body;