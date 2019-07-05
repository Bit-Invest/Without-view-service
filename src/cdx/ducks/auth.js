import authConfig from '@cdx/configs/auth';
import commonUtils from '@cdx/utils/common';

const generalKeyState = 'auth';

const actions = commonUtils.addPropery([], 'parentTag', generalKeyState);

const reducer = (state = authConfig.initialState, action) => {
	const commonProcessed = commonUtils.reducer(state, action, generalKeyState);

	if (commonProcessed !== false)
		return commonProcessed;

	return state;
};

export default ({
	actions,
	reducer,
});
