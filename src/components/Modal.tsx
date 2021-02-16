import { FC } from 'react';
import { connect } from 'react-redux';

import { Store } from '../store/types';
import { setShowModal } from '../actions/modalActions';

interface ModalOpenButtonBaseProps {
	children: any,
	onClick?: (arg0: any) => void,
	[other: string]: any
};

interface ModalOpenButtonProps extends ModalOpenButtonBaseProps {
	dispatch: (arg0: any) => void
};

export const ModalOpenButtonComponent: FC<ModalOpenButtonProps> = ({ children, onClick, dispatch, ...props }) => {
	return (
		<button type="button"
			{...props}
			onClick={onClick ? () => {
				onClick('open');
				dispatch(setShowModal({ showModal: true }));
			} : () => { dispatch(setShowModal({ showModal: true })) }}>
			{children}
		</button>
	);
};

export const ModalOpenButton = connect((state: Store, ownProps: ModalOpenButtonBaseProps) => ownProps)(ModalOpenButtonComponent);

interface ModalBaseProps {
	data?: any,
	children: any
	onClick?: (arg0: any) => void
	[other: string]: any
};

interface ModalCloseButtonProps extends ModalBaseProps {
	dispatch: (arg0: any) => void
};

export const ModalCloseButtonComponent: FC<ModalCloseButtonProps> = ({ data, dispatch, children, onClick, ...props }) => {
	return (
		<button type="button"
			{...props}
			onClick={onClick ? () => {
				onClick(data);
				dispatch(setShowModal({ showModal: false }));
			} : () => { dispatch(setShowModal({ showModal: false })) }}>
			{children}
		</button>
	);
};

export const ModalCloseButton = connect((state: Store, ownProps: ModalBaseProps) => ownProps)(ModalCloseButtonComponent);

export const ModalHeader: FC<ModalBaseProps> = (props) => {
	return (
		<div className="modal-header">
			{props.children}
		</div>
	);
};

export const ModalTitle: FC<ModalBaseProps> = (props) => {
	return (
		<h5 className="modal-title">
			{props.children}
		</h5>
	);
};


export const ModalBody: FC<ModalBaseProps> = (props) => {
	return (
		<div className="modal-body">
			{props.children}
		</div>
	);
};

export const ModalFooter: FC<ModalBaseProps> = (props) => {
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	);
};

interface ModalProps {
	id: string,
	children: any,
	show: boolean
};

const ModalComponent: FC<ModalProps> = ({ id, children, show }) => {
	return (
		<div className="modal" style={{ display: show ? 'block' : 'none' }} tabIndex={-1} id={id}>
			<div className="modal-dialog">
				<div className="modal-content">
					{children}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: Store, { id, children }: { id: string, children: any }): ModalProps => ({
	id, children, show: state.modal.showModal
});

export const Modal = connect(mapStateToProps)(ModalComponent);
