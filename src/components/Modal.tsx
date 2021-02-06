import { FunctionComponent as Component } from 'react';

type ModalOpenButtonProps = {
	'modal-id': string,
	children: any
	[other: string]: any
};

export const ModalOpenButton: Component<ModalOpenButtonProps> = (props) => {
	return (
		<button type="button"
			{...props}
			data-bs-toggle="modal"
			data-bs-target={`#${props['modal-id']}`}>
			{props.children}
		</button>
	);
}

type ModalBaseProps = {
	children: any
	[other: string]: any
};

export const ModalCloseButton: Component<ModalBaseProps> = (props) => {
	return (
		<button type="button"
			{...props}
			data-bs-dismiss="modal">
			{props.children}
		</button>
	);
}

export const ModalHeader: Component<ModalBaseProps> = (props) => {
	return (
		<div className="modal-header">
			{props.children}
		</div>
	);
}

export const ModalTitle: Component<ModalBaseProps> = (props) => {
	return (
		<h5 className="modal-title">
			{props.children}
		</h5>
	);
}


export const ModalBody: Component<ModalBaseProps> = (props) => {
	return (
		<div className="modal-body">
			{props.children}
		</div>
	);
}


export const ModalFooter: Component<ModalBaseProps> = (props) => {
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	);
}

type ModalProps = {
	id: string,
	children: any
	[other: string]: any
};

export const Modal: Component<ModalProps> = (props) => {
	return (
		<div className="modal" tabIndex={-1} id={props.id}>
			<div className="modal-dialog">
				<div className="modal-content">
					{props.children}
				</div>
			</div>
		</div>
	);
}
