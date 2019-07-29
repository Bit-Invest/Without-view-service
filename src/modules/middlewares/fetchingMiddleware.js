import axios from 'axios';
import configs from '@cdx/configs/';
import utils from '@cdx/utils/';

const sendRequest = (dispatch, action, getState) => {
	const host = configs.common.urlsApi[action.data.api];
	const path = `${host}${action.data.url}`;
	const tokens = utils.common.getAuthTokens();

	return axios({
		headers: {
			'Content-Type': 'application/json',
    	'Access-Control-Allow-Origin': '*',
    	'Access-Token': tokens.accessToken,
    	'Refresh-Token': tokens.refreshToken,
		},
		method: action.data.method,
		data: action.data.body,
		url: path,
	})
		.then(function (response) {
			if (response.data.error) 
				return setResponsed(dispatch, action, response.data.error, 'error', getState);

			return setResponsed(dispatch, action, response.data, 'success', getState);
	  })
	  .catch(function (error) {
	  	return setResponsed(dispatch, action, error, 'error', getState);
	  });
}

const setPrestate = (dispatch, action) => {
	if (action.keyState && action.prestateValue !== 'disable') {
		return dispatch({
			...action,
			type: 'FORCE_SET',
			value: action.data.prestateValue || configs.common.TYPES_RESULT.LOADING,
			keyState: action.keyState,
		});
	}
}

const setResponsed = async (dispatch, action, response, status, getState) => {
	if (status === 'error') {
		if (action.errorStatusValue !== 'disable') {
			let errorValue = configs.common.TYPES_RESULT.ERROR;

			if (typeof action.data.errorStatusValue === 'function') {
				errorValue = action.data.errorStatusValue(response);
			} else if (action.data.errorStatusValue) {
				errorValue = action.data.errorStatusValue;
			}

			await dispatch({
				...action,
				type: 'FORCE_SET',
				value: errorValue,
				keyState: action.keyState,
			});
		}

		if (action.tags.errorNoCauseForTied && action.tags.tiedActions) {
			utils.common.submitActions(dispatch, action.tags.tiedActions(), true, getState());
		}

		return action.data.errorStatusValue || configs.common.TYPES_RESULT.ERROR;
	}

	await dispatch({
		...action,
		type: 'FORCE_SET',
		value: ((action.data || {}).processingResFn || utils.common.defaultProcessingResFn)(
			{}, 
			response.data, 
			action, 
			getState()
		),
		keyState: action.keyState,
	});

	if (action.tags.tiedActions)
		utils.common.submitActions(dispatch, action.tags.tiedActions(), true, getState());

	return ((action.data || {}).processingResFn || utils.common.defaultProcessingResFn)(
		{}, 
		response.data, 
		action, 
		getState()
	);
};

export default  ({ dispatch, getState }) => next => action => {	
  if (typeof action === 'object' && action.type === 'REQUEST') {
  	setPrestate(dispatch, action);
  	return sendRequest(dispatch, action, getState);
  }

  if (typeof action === 'object' && action.type === 'FORCE_NOSET') {
  	return setResponsed(dispatch, action, {data: action.value}, 'noset', getState);
  }

  return next(action);
};
