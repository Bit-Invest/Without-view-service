const TYPES_RESULT = {
	'ERROR': -2,
	'LOADING': -1, 
	'SUCESS': 1,
};

const urlsApi = {
	baseCindx: 'https://api-live.cindx.io',
};

const initialState = {
  loginRes: {
  	accessToken: false,
  	refreshToken: false,
  },
  userInfo: -1,
};

const privatePages = ['profile'];

const settings = {
	ratingMax: 10,
	ragingScale: 100,
};

const loggerSettings = {
	groupNames: ['profile', 'myproduct', 'marketproduct', 'marketplace'],
	active: false,
};

export default ({
	urlsApi,
	initialState,
	TYPES_RESULT,
	privatePages,
 	settings,
 	loggerSettings,
});
