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
	ratingMax: 2,
	ragingScale: 100,
};

export default ({
	urlsApi,
	initialState,
	TYPES_RESULT,
	privatePages,
 	settings,
});
