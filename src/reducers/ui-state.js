export const TOGGLE_LOADING = 'TOGGLE_LOADING';

const defaultState = {
	loading: false
};

export default (state = defaultState, { type, payload }) => {
	switch (type) {
		case TOGGLE_LOADING: return Object.assign({}, state, { loading: payload.isLoading });

		default: return state;
	}
}