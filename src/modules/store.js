import { combineReducers } from 'redux';
import ducks from '@cdx/ducks/';

export default combineReducers({
	profile: ducks.profile.reducer,
	auth: ducks.auth.reducer,
	common: ducks.common.reducer,
	myproduct: ducks.myproduct.reducer,
	marketplace: ducks.marketplace.reducer,
	marketproduct: ducks.marketproduct.reducer,
});
