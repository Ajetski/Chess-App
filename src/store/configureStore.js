import { createStore } from 'redux';
import chessReducer from "../reducers/chessReducer";

export default function configureStore() {
	const store = createStore(chessReducer);
	return store;
}
