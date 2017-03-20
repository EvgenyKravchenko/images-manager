import { IMAGE_LOADED, REMOVE_PENDING_IMAGE } from '../reducers/pending-images';
import {
	ADD_IMAGE,
	UPDATE_IMAGE,
	IMAGES_FETCHED,
	DELETE_IMAGE
} from '../reducers/images';

import { toggleLoading } from '../actions/ui-state-actions';

import { saveImageAPI, updateImageAPI, fetchImageAPI, fetchImagesAPI, deleteImageAPI } from '../api';

export const loadImage = image => {
	return {
		type: IMAGE_LOADED,
		payload: {
			image
		}
	}
};

export const addImage = image => {
	return {
		type: ADD_IMAGE,
		payload: {
			image
		}
	}
};

export const removePendingImage = name => {
	return {
		type: REMOVE_PENDING_IMAGE,
		payload: {
			name
		}
	}
};

export const fetchImages = () => {
	return (dispatch, getState) => {
		dispatch(toggleLoading(true));

		return fetchImagesAPI().then(
			images => {
				dispatch(resetImages(images));
				dispatch(toggleLoading(false));
			}
		)
	}
};

export const fetchImage = id => {
	return (dispatch, getState) => {
		dispatch(toggleLoading(true));

		fetchImageAPI(id).then(
			image => {
				dispatch(addImage(image));
				dispatch(toggleLoading(false));
			},
			error => dispatch(toggleLoading(false))
		);
	}
};

export const saveImage = payload => {
	return (dispatch, getState) => {
		dispatch(toggleLoading(true));

		return saveImageAPI(payload.image).then(
			savedImage => {
				dispatch(addImage(savedImage));
				dispatch(removePendingImage(payload.originalName));
				dispatch(toggleLoading(false));
			}
		)
	}
};

export const updateImage = payload => {
	return (dispatch, getState) => {
		dispatch(toggleLoading(true));

		return saveImageAPI(payload.image).then(
			savedImage => {
				dispatch(onUpdateImage(savedImage));
				dispatch(toggleLoading(false));
			}
		)
	}
};

export const deleteImage = image => {
	return (dispatch, getState) => {
		dispatch(toggleLoading(true));

		return deleteImageAPI(image).then(
			success => {
				dispatch(onDeleteImage(image));
				dispatch(toggleLoading(false));
			}
		)
	}
};


function onUpdateImage(image) {
	return {
		type: UPDATE_IMAGE,
		payload: {
			image
		}
	};
}

function onDeleteImage(image) {
	return {
		type: DELETE_IMAGE,
		payload: {
			image
		}
	}
}

function resetImages(images) {
	return {
		type: IMAGES_FETCHED,
		payload: {
			images
		}
	}
}