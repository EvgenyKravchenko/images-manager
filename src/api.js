import { v4 } from 'node-uuid';

if (!localStorage.getItem('ids')) {
	localStorage.setItem('ids', serialize([]));
}

export const fetchImageAPI = id => {
	const image = deserialize(localStorage.getItem(id));

	return Promise.resolve(image);
};

export const saveImageAPI = image => {
	const isNew = !image.id;

	if (isNew) image.id = v4();
	localStorage.setItem(image.id, serialize(image));

	isNew && saveId(image.id);

	return returnWithDelay(image, 500);
};

export const deleteImageAPI = image => {
	const ids = deserialize(localStorage.getItem('ids'));
	const indexToDelete = ids.findIndex(i => i === image.id);

	ids.splice(indexToDelete, 1);
	localStorage.removeItem(image.id);
	localStorage.setItem('ids', serialize(ids));

	return returnWithDelay(true, 400);
};

export const fetchImagesAPI = () => {
	const ids = deserialize(localStorage.getItem('ids'));
	const images = ids.map(id => deserialize(localStorage.getItem(id)));

	return returnWithDelay(images);
};


function serialize(object) {
	return JSON.stringify(object);
}

// TODO: catch errors
function deserialize(string) {
	return JSON.parse(string);
}

function saveId(id) {
	let ids = deserialize(localStorage.getItem('ids'));
	if (!ids) {
		ids = [];
	}

	ids.push(id);

	localStorage.setItem('ids', serialize(ids));
}

function returnWithDelay(response, delay = 1000) {
	return new Promise(( resolve, reject ) => {
		setTimeout(() => resolve(response), delay);
	})
}