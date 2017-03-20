export const IMAGE_LOADED = 'IMAGE_LOADED';
export const REMOVE_PENDING_IMAGE = 'REMOVE_PENDING_IMAGE';

export default (state = [], { type, payload }) => {
	switch (type) {
		case IMAGE_LOADED: return [...state, payload.image];
		case REMOVE_PENDING_IMAGE: return remove(state, payload.name);

		default: return state;
	}
}

function remove(state, imageName) {
	const index = state.findIndex(item => item.name === imageName);

	return [
		...state.slice(0, index > 0 ? index : 0),
		...state.slice(index + 1)
	]
}