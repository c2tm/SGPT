import { useEffect } from 'react'
import { router } from '../../Utils/router';

function Body({routerState, setRouterState}) {

    let content = router(routerState, setRouterState);

    return (
        <div>
            {content}
        </div>
    )
}

export default Body;