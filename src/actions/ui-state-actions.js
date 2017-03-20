import { TOGGLE_LOADING }from '../reducers/ui-state';

export const toggleLoading = isLoading => {
	return {
		type: TOGGLE_LOADING,
		payload: {
			isLoading
		}
	}
};