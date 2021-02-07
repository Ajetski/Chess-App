export function setShowModal({ showModal }: { showModal: boolean }) {
	return {
		type: 'modal/setShowModal',
		showModal
	};
}
