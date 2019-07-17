import utils from '@cdx/utils/';
import configs from '@cdx/configs/';

const generalKeyState = 'myproduct';

const actions = utils.common.addPropery([
	{
		type: 'REQUEST',
		propertyFn: 'getFollowers',
		keyState: 'myFollowers',
		prestateValue: 'disable',
		errorStatusValue: 'disable',
		data: {
			api: 'baseCindx',
			url: '/user/followers',
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
		},
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
	{
		type: 'REQUEST',
		propertyFn: 'sendApproveFollowing',
		keyState: 'sendApproveFollowingRes',
		data: {
			api: 'baseCindx',
			url: '/user/following/approve',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowers,
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
	{
		type: 'REQUEST',
		propertyFn: 'sendRejectFollowing',
		keyState: 'sendRejectFollowingRes',
		data: {
			api: 'baseCindx',
			url: '/user/following/reject',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowers,
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
	{
		type: 'REQUEST',
		propertyFn: 'getThisProduct',
		keyState: 'infoMarketProduct',
		data: {
			api: 'baseCindx',
			url: '/user/products/:productId',
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
				url: `/user/products/${data.productId}`
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'setFreezeFollowing',
		keyState: 'setFreezeFollowing_res',
		data: {
			api: 'baseCindx',
			url: '/user/following/freeze',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowers,
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
	{
		type: 'REQUEST',
		propertyFn: 'setUnFreezeFollowing',
		keyState: 'setUnFreezeFollowing_res',
		data: {
			api: 'baseCindx',
			url: '/user/following/unfreeze',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowers,
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
	{
		type: 'REQUEST',
		propertyFn: 'getBalanceByFollowing',
		keyState: 'balancesFollowings',
		prestateValue: 'disable',
		data: {
			api: 'baseCindx',
			url: '/user/following/balance',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res, tsAction, store, status) => {
				const { followingId } = tsAction.data;
				const tsBalancesFollowings = store.myproduct.balancesFollowings;
				let resArr = typeof tsBalancesFollowings === 'object' && tsBalancesFollowings;
				const tsBalancesIndex = resArr && resArr.findIndex(curBalanaces =>
					followingId === curBalanaces.followingId
				);
				const tsDataSet = {
					followingId,
					...res,
				};

				if (resArr) {
					if (tsBalancesIndex !== -1) resArr[tsBalancesIndex] = tsDataSet;
					else resArr.push(tsDataSet);
				} else {
					resArr = [tsDataSet];
				}

				return resArr;
			},
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				url:  `/user/following/balance?followingId=${data.followingId}`,
				followingId: data.followingId,
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'getOrdersByFollowing',
		keyState: 'ordersFollowings',
		prestateValue: 'disable',
		data: {
			api: 'baseCindx',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res, tsAction, store, status) => {
				const { followingId } = tsAction.data;
				const tsOrdersFollowings = store.myproduct.ordersFollowings;
				let resArr = typeof tsOrdersFollowings === 'object' && tsOrdersFollowings;
				const tsOrdersIndex = resArr && resArr.findIndex(curBalanaces =>
					followingId === curBalanaces.followingId
				);
				const tsDataSet = {
					followingId,
					...res,
				};

				if (resArr) {
					if (tsOrdersIndex !== -1) resArr[tsOrdersIndex] = tsDataSet;
					else resArr.push(tsDataSet);
				} else {
					resArr = [tsDataSet];
				}

				return resArr;
			},
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				url:  `/user/following/orders?followingId=${data.followingId}&ordersAmount=${500}`,
				followingId: data.followingId,
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'setFollowingMode',
		keyState: 'setFollowingMode_res',
		data: {
			api: 'baseCindx',
			url: '/user/following/mode',
			method: 'POST',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getFollowers,
			],
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				body: {
					followingId: data.followingId,
					mode: data.mode,
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

const reducer = (state = configs.myproduct.initialState, action) => {
	const commonProcessed = utils.common.reducer(state, action, generalKeyState);

	if (commonProcessed !== false)
		return commonProcessed;

	return state;
}

export default ({
	actions,
	reducer,
});
