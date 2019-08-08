export const getFilteredProducts = (products, {
	sortParam, filterBaseAsset, filterStock
}) => {
	const tsProducts= typeof products === 'object' && products;
	const resProducts = (tsProducts || [])
		// .filter(curProduct => Object.keys(curProduct.rating).length && curProduct.rating.baseIncomeHistory.length);

	const getTime = (date) => new Date(date).getTime();
	const step = [];

	const sorted = resProducts.sort(({
		'followers': ({followers: followersA}, {followers: followersB}) => 
			parseFloat(followersB) - parseFloat(followersA),
		'date': ({since: sinceA}, {since: sinceB}) =>
			getTime(sinceB) - getTime(sinceA),
		'rating': ({rating: {value: ratingValueA}}, {rating: {value: ratingValueB}}) =>
			parseFloat(ratingValueB) - parseFloat(ratingValueA),
	})[sortParam]);

	const filterStep = [];
	
	filterStep[0] = sorted.filter(curProduct => 
		([curProduct.baseAsset, 'ALL']).includes(filterBaseAsset) &&
		([(curProduct.stock).toUpperCase(), 'ALL']).includes(filterStock)
	);	

	// filterStep[1] = sorted.filter(curProduct => curProduct.baseAsset === filterBaseAsset);	

	return filterStep[0];
};

export default ({
	getFilteredProducts,
});
