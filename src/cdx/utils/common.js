import configs from '@cdx/configs/';

export const notPassed = (state) => 
	((state !== configs.common.TYPES_RESULT['ERROR'] &&
  	state !== configs.common.TYPES_RESULT['LOADING'] && 
  		Object.keys(state).length > 0) && 1) || 0

export const addPropery = (arr, property, value) => 
	arr.map(curObj => ({
		...curObj,
		[property]: curObj[property] || value
	}))	

export const saveAuthTokens = (data) => {
	localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const removeAuthTokens = (data) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getAuthTokens = (data) => ({
	accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
});

export const reducer = (state = configs.common.initialState, action, parentTag) => {
	let isProcessed = false;
	let newState;

	if (action.parentTag && action.parentTag !== parentTag)
		return state;

	if (action.type === 'FORCE_SET') {
		isProcessed = true;
		newState = Object.assign({}, state, {
			[action.keyState]: action.value,
		});
	}

	return isProcessed && newState
};

export const submitActions = (dispatch, actions, tied, store) => {
	const usedActions = [];

	actions.forEach(curAction => {
    if (tied) {
      let tsAction = curAction;
      if (curAction.preFnData)
        tsAction = {
          ...tsAction,
          ...tsAction.preFnData({}, tsAction, store),
        };

      if (tsAction.disable)
        return false;

      return dispatch(tsAction);
    }

    if (curAction.tags.manuallyUsed)
      usedActions[curAction.propertyFn] = async (data) => {
        let tsAction = curAction;
        if (curAction.preFnData)
          tsAction = {
            ...tsAction,
            ...tsAction.preFnData(data, tsAction, store),
          };

        if (tsAction.disable)
          return false;

        return await dispatch(tsAction);
      }

    if (curAction.tags.startRequired) {
      let tsAction = curAction;
      if (curAction.preFnData)
        tsAction = {
          ...tsAction,
          ...tsAction.preFnData({}, tsAction, store),
        };

      if (tsAction.disable)
          return false;

      return dispatch(tsAction);
    }
  });

  return usedActions;
};

export const isPagePrivate = (pageName) => 
  configs.common.privatePages.some(curPage =>
    pageName.includes(curPage)
  );

export const isKeysValid = (curKeys) =>
  curKeys.valid === true;

export const isKeysNoFollow = (curKeys, followings) =>
  followings.some(curFollowing =>
    curFollowing.follower === curKeys.keyId
  );

export const getInitials = (name = 'N', surname = 'A') =>
  `${name[0]}${surname[0]}`;

export const getPercentFromValueRating = (value = 1) =>
  value / configs.common.settings.ratingMax * 100 * configs.common.settings.ragingScale;

export const getRatingValueShow = (value) =>
  (value * configs.common.settings.ragingScale).toFixed(2);

export const defaultProcessingResFn = (cb, res) => res;

export const logger = (groupName) => (arrLog) => {
  const { loggerSettings: { groupNames, active } } = configs.common;

  if (active && groupNames.includes(groupName)) {
    console.log(`| ${groupName}:`, arrLog);
  }
};

export default ({
  logger,
	notPassed,
	addPropery,
	saveAuthTokens,
  removeAuthTokens,
	getAuthTokens,
	reducer,
	submitActions,
  isPagePrivate,
  isKeysValid,
  isKeysNoFollow,
  getInitials,
  getPercentFromValueRating,
  getRatingValueShow,
  defaultProcessingResFn,
});
