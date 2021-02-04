import React from 'react';

export function ModalOpenButton(props: {
	'modal-id': string,
	children: any
	[other: string]: any
}) {
	return (
		<button type="button"
			{...props}
			data-bs-toggle="modal"
			data-bs-target={`#${props['modal-id']}`}>
			{props.children}
		</button>
	);
}

export function ModalCloseButton(props: {
	children: any
	[other: string]: any
}) {
	return (
		<button type="button"
			{...props}
			data-bs-dismiss="modal">
			{props.children}
		</button>
	);
}

export function ModalHeader(props: {
	children: any
	[other: string]: any
}) {
	return (
		<div className="modal-header">
			{props.children}
		</div>
	);
}

export function ModalTitle(props: {
	children: any
	[other: string]: any
}) {
	return (
		<h5 className="modal-title">
			{props.children}
		</h5>
	);
}

export function ModalBody(props: {
	children: any
	[other: string]: any
}) {
	return (
		<div className="modal-body">
			{props.children}
		</div>
	);
}

export function ModalFooter(props: {
	children: any
	[other: string]: any
}) {
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	);
}

export function Modal(props: {
	id: string,
	children: any
	[other: string]: any
}) {
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
