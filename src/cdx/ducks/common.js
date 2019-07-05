import commonConfig from '@cdx/configs/common';
import commonUtils from '@cdx/utils/common';

const generalKeyState = 'common';

const actions = commonUtils.addPropery([
	{
		type: 'REQUEST',
		propertyFn: 'getInfo',
		keyState: 'userInfo',
		data: {
			api: 'baseCindx',
			url: '/user/info',
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
		propertyFn: 'authLogin',
		keyState: 'loginRes',
		data: {
			api: 'baseCindx',
			url: '/auth/login',
			method: 'POST',
			body: {},
			processingResFn: (cbParams, res) => {
				if (res.accessToken && res.refreshToken)
					commonUtils.saveAuthTokens(res);

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
					email: data.email,
					password: data.password,
				},
			},
		}),
	},
	{
		type: 'REQUEST',
		propertyFn: 'authRegistration',
		keyState: 'regRes',
		data: {
			api: 'baseCindx',
			url: '/auth/signup',
			method: 'POST',
			body: {},
			processingResFn: (cbParams, res) => {
				if (res.accessToken && res.refreshToken)
					commonUtils.saveAuthTokens(res);

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
					email: data.email,
					password: data.password,
					firstName: data.firstName,
					lastName: data.lastName,
					roleId: 0,
				},
			},
		}),
	},
	{
		type: 'FORCE_SET',
		propertyFn: 'setTokensForRedux',
		keyState: 'loginRes',
		value: commonUtils.getAuthTokens(),
		tags: {
			manuallyUsed: false,
			startRequired: true,
		},
	},
	{
		type: 'REQUEST',
		propertyFn: 'refreshTokens',
		keyState: 'loginRes',
		data: {
			api: 'baseCindx',
			url: '/auth/refresh',
			method: 'POST',
			body: {},
			processingResFn: (cbParams, res, status) => {
				if (res.accessToken && res.refreshToken)
					commonUtils.saveAuthTokens(res);

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
					accessToken: data.accessToken,
					refreshToken: data.refreshToken,
				},
			},
		}),
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
], 'parentTag', generalKeyState);

const reducer = (state = commonConfig.initialState, action, parentTag) => {
	const commonProcessed = commonUtils.reducer(state, action, generalKeyState)

	if (commonProcessed !== false)
		return commonProcessed

	return state
};

export default ({
	reducer,
	actions,
});
