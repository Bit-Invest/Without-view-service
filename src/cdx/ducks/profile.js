import profileConfig from '@cdx/configs/profile';
import utils from '@cdx/utils/';

const generalKeyState = 'profile';

const actions = utils.common.addPropery([
	{
		type: 'FORCE_NOSET',
		propertyFn: 'setBaseAsset',
		keyState: 'dashboard',
		value: -1,
		data: {
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getIncomeKeys,
			],
		},
		preFnData: (coin, tsAction) => ({
			...tsAction,
			value: {baseAsset: coin},
		}),
	},
	{
		type: 'FORCE_NOSET',
		propertyFn: 'clearBalanceKeys',
		keyState: 'balancesKeys',
		value: -1,
		data: {
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: false,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getBalanceKeys,
			],
		},
	},
	{
		type: 'FORCE_NOSET',
		propertyFn: 'clearIncomeKeys',
		keyState: 'incomeKeys',
		value: -1,
		data: {
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: false,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getIncomeKeys,
			],
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'getIncomeKeys',
		keyState: 'incomeKeys',
		prestateValue: 'disable',
		errorStatusValue: 'disable',
		data: {
			api: 'baseCindx',
			url: '',
			method: 'GET',
			body: [],
			processingResFn: (cbParams, res, tsAction, store, status) => {
				const tsIncomeKeys = store.profile.incomeKeys;
				const nowArr = typeof tsIncomeKeys === 'object' && tsIncomeKeys;

				return [
					...(nowArr || []),
					{
						keyId: tsAction.data.keyId,
						baseAsset: tsAction.data.baseAsset,
						income: (res || {baseIncome: {}}).baseIncome,
					},
				];
			},
		},
		tags: {
			manuallyUsed: false,
			startRequired: false,
			// errorNoCauseForTied: false,
		},
		preFnData: (data, tsAction, store) => {
			const { profile } = store;
			const { incomeKeys, keys, dashboard } = profile;
			const marketKeys = utils.profile.getMarketplaceInvestors(store.profile);
			const swapedKeys = [...keys, ...marketKeys];

			const { nextKeyId, isLast, } = utils.profile.getNextKeyIdForGetIncomes(swapedKeys, incomeKeys, dashboard.baseAsset);

			if (!nextKeyId) return {
				disable: true,
			};

			const newAction = {
				...tsAction,
				data: {
					...tsAction.data,
					url: `/user/income-history/${nextKeyId}/${dashboard.baseAsset}`,
					keyId: nextKeyId,
					baseAsset: dashboard.baseAsset,
					courBAN: (tsAction.data.courBAN || 0) + 1,
				},
			};

			if (!isLast) {
				newAction.tags = {
					...newAction.tags,
					tiedActions: () => [
						{
							...newAction,
							tags: {
								...newAction.tags,
								tiedActions: () => [],
							}
						}
					],
				};
			}

			if (newAction.data.courBAN > ((swapedKeys.length || 0) + 1)) return {};
			return newAction;
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'getBalanceKeys',
		keyState: 'balancesKeys',
		prestateValue: 'disable',
		errorStatusValue: 'disable',
		data: {
			api: 'baseCindx',
			url: '',
			method: 'GET',
			processingResFn: (cbParams, res, tsAction, store, status) => {
				const tsBalancesKeys = store.profile.balancesKeys;
				const nowArr = typeof tsBalancesKeys === 'object' && tsBalancesKeys;

				return [
					...(nowArr || []),
					{
						keyId: tsAction.data.keyId,
						...(res || {}),
					},
				];
			},
		},
		tags: {
			manuallyUsed: false,
			startRequired: false,
			// errorNoCauseForTied: false,
		},
		preFnData: (data, tsAction, store) => {
			const { profile } = store;
			const { balancesKeys, keys, dashboard } = profile;
			const marketKeys = utils.profile.getMarketplaceInvestors(store.profile);
			const swapedKeys = [...keys, ...marketKeys];

			const { nextKeyId, isLast, } = utils.profile.getNextKeyIdForGetBalances(swapedKeys, balancesKeys);
			
			if (!nextKeyId) return {
				disable: true,
			};

			const newAction = {
				...tsAction,
				data: {
					...tsAction.data,
					url: `/user/balance?keyId=${nextKeyId}`,
					keyId: nextKeyId,
					baseAsset: dashboard.baseAsset,
					courBAN: (tsAction.data.courBAN || 0) + 1,
				},
			};

			if (!isLast) {
				newAction.tags = {
					...newAction.tags,
					tiedActions: () => [
						{
							...newAction,
							tags: {
								...newAction.tags,
								tiedActions: () => [],
							}
						}
					],
				};
			}

			if (newAction.data.courBAN > ((swapedKeys.length || 0) + 1)) return {};
			return newAction;
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
			startRequired: false,
			tiedActions: () => [
				actionsForTied.clearBalanceKeys,
				actionsForTied.clearIncomeKeys,
			],
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'addKeys',
		keyState: 'addKeysRes',
		data: {
			api: 'baseCindx',
			url: '/user/key',
			method: 'POST',
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
				body: {
					apiKey: data.apiKey,
	        apiSecret: data.secretKey,
	        stock: 'binance',
	        name: data.name,
	        groupName: data.groupName,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'removeKeys',
		keyState: 'removeKeysRes',
		data: {
			api: 'baseCindx',
			url: '/user/key',
			method: 'DELETE',
			body: [],
			processingResFn: (cbParams, res) => res,
		},
		tags: {
			manuallyUsed: true,
			startRequired: false,
			tiedActions: () => [
				actionsForTied.getProducts,
			],
		},
		preFnData: (data, tsAction) => ({
			data: {
				...tsAction.data,
				body: {
					keyId: data.keyId,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'editKeys',
		keyState: 'editKeysRes',
		data: {
			api: 'baseCindx',
			url: '/user/key',
			method: 'PUT',
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
				body: {
					name: data.name,
					keyId: data.keyId,
					apiKey: data.apiKey,
	        apiSecret: data.secretKey,
				},
			},
		}),
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
		propertyFn: 'getFollowers',
		keyState: 'myFollowers',
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
			tiedActions: () => [
				actionsForTied.getKeys,
			],
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'addProduct',
		keyState: 'addProductRes',
		data: {
			api: 'baseCindx',
			url: '/user/products',
			method: 'POST',
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
				body: {
					description: data.description,
          name: data.name,
          baseAsset: data.baseAsset,
          keyId: data.keyId,
          typeId: parseFloat(data.typeId),
          startingTimestamp: data.startingTimestamp,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'removeProduct',
		keyState: 'removeProductRes',
		data: {
			api: 'baseCindx',
			url: '/user/products',
			method: 'DELETE',
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
				body: {
					productId: data.productId,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'editProduct',
		keyState: 'editKeysRes',
		data: {
			api: 'baseCindx',
			url: '/products/:productId',
			method: 'PUT',
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
				url: `/user/products/${data.productId}`,
				body: {
					description: data.description,
          name: data.name,
          baseAsset: data.baseAsset,
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

const reducer = (state = profileConfig.initialState, action) => {
	const commonProcessed = utils.common.reducer(state, action, generalKeyState)

	if (commonProcessed !== false)
		return commonProcessed

	return state
};

export default ({
	actions,
	reducer,
});
