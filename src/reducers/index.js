import { combineReducers } from 'redux';

import images from './images';
import pendingImages from './pending-images';
import uiState from './ui-state';

export default combineReducers({
	images,
	pendingImages,
	uiState
});