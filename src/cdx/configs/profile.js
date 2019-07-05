const initialState = {
  keys: -1,
  myProducts: -1,
  connectedProducts: -1,
  incomeKeys: -1,
  balancesKeys: -1,
  dashboard: {
  	baseAsset: 'USD',
  },
};

export const settingsShow = {
	courDayIntervalProfit: 7, //smallKeys
  courDayIntervalSmallProduct: 30, //smallProduct
};

export default ({
	initialState,
	settingsShow,
});
