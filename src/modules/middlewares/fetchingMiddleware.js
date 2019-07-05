import axios from 'axios';
import configs from '@cdx/configs/';
import utils from '@cdx/utils/';

const sendRequest = (dispatch, action, getState) => {
	const host = configs.common.urlsApi[action.data.api];
	const path = `${host}${action.data.url}`;
	const tokens = utils.common.getAuthTokens();

	axios({
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
			console.log({response});
			if (response.data.error) 
				return setResponsed(dispatch, action, response.data.error, 'error', getState);

			setResponsed(dispatch, action, response.data, 'success', getState);
	  })
	  .catch(function (error) {
	  	setResponsed(dispatch, action, error, 'error', getState);
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
			await dispatch({
				...action,
				type: 'FORCE_SET',
				value: action.data.errorStatusValue || configs.common.TYPES_RESULT.ERROR,
				keyState: action.keyState,
			});
		}

		if (action.tags.errorNoCauseForTied && action.tags.tiedActions) {
			utils.common.submitActions(dispatch, action.tags.tiedActions(), true, {
				store: getState(),
			});
		}

		return true;
	}

	await dispatch({
		...action,
		type: 'FORCE_SET',
		value: action.data.processingResFn({}, response.data, action, {
			store: getState(),
		}),
		keyState: action.keyState,
	});

	if (action.tags.tiedActions)
		utils.common.submitActions(dispatch, action.tags.tiedActions(), true, {
			store: getState(),
		});
};

export default  ({ dispatch, getState }) => next => action => {
  if (typeof action === 'object' && action.type === 'REQUEST') {
  	setPrestate(dispatch, action);
  	sendRequest(dispatch, action, getState);
  }

  if (typeof action === 'object' && action.type === 'FORCE_NOSET') {
  	setResponsed(dispatch, action, {data: action.value}, 'noset', getState);
  }

  return next(action);
};
