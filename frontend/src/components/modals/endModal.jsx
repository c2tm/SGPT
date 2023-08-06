import "./endModal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { clearState, clearStorage, clearUrl } from '../../Utils/functions.jsx';

function CustomModal({openModal, setOpenModal, setPlaylistState, setTitleState, setRouterState, setAccessTokenState, setUserIdState}) {

    function handleResetApp() {
        clearUrl();
        clearStorage([
            'titleState', 'playlistState'
        ]);
        clearState(setOpenModal, setPlaylistState, setTitleState, setRouterState, setAccessTokenState, setUserIdState);
    }

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>

            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                >
                <div>
                    <h4>All Done!</h4>
                    <p>
                    Your playlist has been created! Check your Spotify Account!
                    </p>
                    <div className="button-container">
                        <button onClick={() => handleResetApp()}>Home</button>
                        <button onClick={() => setOpenModal(false)}>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomModal;