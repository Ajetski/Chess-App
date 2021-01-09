export function ModalOpenButton(props) {
	console.log(props, props['modal-id'])
	return (
		<button type="button"
			{...props}
			data-bs-toggle="modal"
			data-bs-target={`#${props['modal-id']}`}>
			{props.children}
		</button>
	);
}

export function ModalCloseButton(props) {
	return (
		<button type="button"
			{...props}
			data-bs-dismiss="modal">
			{props.children}
		</button>
	);
}

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

export function Modal(props) {

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
