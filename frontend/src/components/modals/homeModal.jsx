import "./homeModal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { clearState, clearStorage, clearUrl } from '../../Utils/functions.jsx';

function HomeModal({openModal, setOpenModal}) {

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>

            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                >
                <div>
                    <h4>Oops!</h4>
                    <p>
                    Your playlist couldn't be created. Try again or adjust your prompt for better results.
                    </p>
                    <div>
                        <button onClick={() => setOpenModal(false)}>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default HomeModal;