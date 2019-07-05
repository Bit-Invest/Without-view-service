export const getFilteredProducts = (products) => {
	const tsProducts= typeof products === 'object' && products;
	const resProducts = (tsProducts || [])
		// .filter(curProduct => Object.keys(curProduct.rating).length && curProduct.rating.baseIncomeHistory.length);

	return resProducts;
};

export default ({
	getFilteredProducts,
});
