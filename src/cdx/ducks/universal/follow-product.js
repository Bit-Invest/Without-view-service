const actions = [
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
			startRequired: false,
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
];

const tsActionsForTied = actions.reduce((pr, curAction) => 
	Object.assign({}, pr, {
		[curAction.propertyFn]: curAction,
	})
, {});

export default ({
	'array': actions,
	'object': tsActionsForTied,
});
