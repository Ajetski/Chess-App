const initialState = {
	showModal: false
};

export default function modalReducer(state = initialState, action: any) {
	if (action.type === 'modal/setShowModal')
		return {
			...state,
			showModal: action.showModal
		};
	return state;
}
