import configs from '@cdx/configs/';
import utils from '@cdx/utils/';

export const getTimeOfDeath = () => {
  const authTokens = utils.common.getAuthTokens();

	if (!authTokens.accessToken || !authTokens.refreshToken)
		return false;

  const curMilliseconds = new Date().getTime();
  const claims = JSON.parse(atob(authTokens.accessToken.split('.')[1]));
  const msToExpire = (claims.exp * 1000 - curMilliseconds);

  return msToExpire < 0 ? 0 : msToExpire;
};

export default ({
	getTimeOfDeath,
});
