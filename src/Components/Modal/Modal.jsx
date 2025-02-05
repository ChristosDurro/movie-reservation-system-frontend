/* eslint-disable react/prop-types */
import "./Modal.css";

const Modal = ({ setOpenModal, handleReservCancelClick }) => {
	return (
		<div className="modal-backdrop">
			<div className="modal-content">
				<h2>Confirm Cancellation</h2>
				<hr />
				<p>Are you sure you want to cancel this reservation?</p>
				<div className="modal-btns">
					<button onClick={handleReservCancelClick}>Yes</button>
					<button onClick={() => setOpenModal(false)}>No</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
