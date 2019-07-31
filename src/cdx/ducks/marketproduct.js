import utils from '@cdx/utils/';
import configs from '@cdx/configs/';

const generalKeyState = 'marketproduct';

const actions = utils.common.addPropery([
	{
		type: 'REQUEST',
		propertyFn: 'getMarketProduct',
		keyState: 'infoMarketProduct',
		data: {
			api: 'baseCindx',
			url: '/products/:productId',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				url: `/products/${data.productId}`
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'getKeys',
		keyState: 'keys',
		data: {
			api: 'baseCindx',
			url: '/user/key',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res) => {
				return res;
			},
		},
		tags: {
			manuallyUsed: true,
			startRequired: true,
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'sendFollow',
		keyState: 'sendFollowRes',
		data: {
			api: 'baseCindx',
			url: '/user/follow',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => {
				return res;
			},
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowings,
			],
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				body: {
					selfKeyId: data.selfKeyId, 
					productId: data.productId,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'sendUnFollow',
		keyState: 'sendUnFollowRes',
		data: {
			api: 'baseCindx',
			url: '/user/unfollow',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => {
				return res;
			},
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowings,
			],
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				body: {
					selfKeyId: data.selfKeyId, 
					productId: data.productId,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'getFollowings',
		keyState: 'myFollowings',
		data: {
			api: 'baseCindx',
			url: '/user/followings',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: true,
			tiedActions: () => [
				actionsForTied.getFollowings,
			],
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'getProducts',
		keyState: 'myProducts',
		data: {
			api: 'baseCindx',
			url: '/user/products',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: true,
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'reapplyFollowing',
		keyState: 'reapplyFollowingRes',
		data: {
			api: 'baseCindx',
			url: '/user/following/reapply',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => {
				return res;
			},
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowings,
			],
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				body: {
					followingId: data.followingId,
				},
			},
		}),
	},
], 'parentTag', generalKeyState);

const actionsForTied = actions.reduce((pr, curAction) => 
	Object.assign({}, pr, {
		[curAction.propertyFn]: curAction,
	})
, {});

const reducer = (state = configs.marketproduct.initialState, action) => {
	const commonProcessed = utils.common.reducer(state, action, generalKeyState);

	if (commonProcessed !== false)
		return commonProcessed;

	return state;
}

export default ({
	actions,
	reducer,
});
