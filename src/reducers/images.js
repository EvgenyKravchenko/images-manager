export const ADD_IMAGE = 'ADD_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const START_SAVE_IMAGE = 'START_SAVE_IMAGE';
export const START_FETCHING_IMAGES = 'START_FETCHING_IMAGES';
export const FINISH_FETCHING_IMAGES = 'FINISH_FETCHING_IMAGES';
export const IMAGES_FETCHED = 'IMAGES_FETCHED';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export default (state = [], { type, payload }) => {
	switch (type) {
		case ADD_IMAGE: return [...state, payload.image];
		case IMAGES_FETCHED: return [...payload.images];
		case UPDATE_IMAGE: return update(state, payload.image);
		case DELETE_IMAGE: return deleteImage(state, payload.image);

		default: return state;
	}
}

function update(state, image) {
	const foundIndex = state.findIndex(it => it.id === image.id);
	const newState = [...state];
	newState[foundIndex] = Object.assign({}, state[foundIndex], image);

	return newState;
}

function deleteImage(state, image) {
	const foundIndex = state.findIndex(it => it.id === image.id);
	const newState = [...state];

	newState.splice(foundIndex, 1);

	return newState;
}
