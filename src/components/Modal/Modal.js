/*
* To open the modal, use a button with attributes:
* data-bs-toggle="modal" data-bs-target="#ID"
*
* To dismiss the modal, use a button with attribute:
* data-bs-dismiss="modal"
*/

export function ModalHeader(props) {
	return (
		<div className="modal-header">
			{props.children}
		</div>
	);
}

export function ModalTitle(props) {
	return (
		<h5 className="modal-title">
			{props.children}
		</h5>
	);
}

export function ModalBody(props) {
	return (
		<div className="modal-body">
			{props.children}
		</div>
	);
}

export function ModalFooter(props) {
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	);
}

export default function Modal(props) {

	return (
		<div className="modal" tabIndex="-1" id={props.id}>
			<div className="modal-dialog">
				<div className="modal-content">
					{props.children}
				</div>
			</div>
		</div>
	);
}