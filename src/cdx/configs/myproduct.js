const initialState = {
	myFollowers: -1,
	infoMarketProduct: -1,
	balancesFollowings: -1,
	ordersFollowings: -1,
};

const settings = {
	intervalUpdateFollowersSec: 3 * 1000, 
};

const statusesShowing = {
	'TRADE': 'FILLED',
	'CANCELED': 'CANCELED',
	'NEW': 'OPEN',
};

export default ({
	initialState,
	settings,
	statusesShowing,
});
