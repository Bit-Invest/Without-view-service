import utils from '@cdx/utils/';
import configs from '@cdx/configs/';

const generalKeyState = 'marketplace';

const actions = utils.common.addPropery([
	{
		type: 'REQUEST',
		propertyFn: 'getMarketProducts',
		keyState: 'marketProducts',
		data: {
			api: 'baseCindx',
			url: '/products',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: true,
		},
	},
], 'parentTag', generalKeyState);

const reducer = (state = configs.marketplace.initialState, action) => {
	const commonProcessed = utils.common.reducer(state, action, generalKeyState);

	if (commonProcessed !== false)
		return commonProcessed;

	return state;
}

export default ({
	actions,
	reducer,
});
