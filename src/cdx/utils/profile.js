import configs from '@cdx/configs/';
import mixins from '@cdx/mixins/';
import moment from 'moment';

export const getNextKeyIdForGetIncomes = (keys, incomes, baseAsset) => {
	const tsKeys = typeof keys === 'object' && keys;
	const tsIncomes = typeof incomes === 'object' && incomes;

	const unworkedKeys = (tsKeys || []).filter(curKey => 
		!(tsIncomes || []).find(curIncome => 
      curKey.keyId === curIncome.keyId && 
      curIncome.baseAsset === baseAsset
    )
	);

	return unworkedKeys.length ? {
		nextKeyId: unworkedKeys[0].keyId,
		isLast: unworkedKeys.length === 1,
	} : {
		nextKeyId: false,
	};
};

export const getNextKeyIdForGetBalances = (keys, balances) => {
  const tsKeys = typeof keys === 'object' && keys;
  const tsBalances = typeof balances === 'object' && balances;

  const unworkedKeys = (tsKeys || []).filter(curKey => 
    !(tsBalances || []).find(curBalances => 
      curKey.keyId === curBalances.keyId
    )
  );

  return unworkedKeys.length ? {
    nextKeyId: unworkedKeys[0].keyId,
    isLast: unworkedKeys.length === 1,
  } : {
    nextKeyId: false,
  };
};

export const getBalanceHistory = (arr, baseAsset, type) => {
  if (!(arr && arr.value)) return false;
  
  const balance = arr.value;
  
  const toFix = str => 
    parseFloat(str).toFixed(({'USD':2,'BTC':5})[baseAsset]);

  return {
    available: toFix(balance.available),
    hold: toFix(balance.hold),
  };
};

export const getValueHistory = (arr, baseAsset, type) => 
  parseFloat((arr || {value: 0}).value)
    .toFixed(({'USD':2,'BTC':5})[baseAsset]);

export const getDataForSmallKeys = (state) => {
  const noLoadedKeys = mixins.common.dataNoLoaded([state.keys]);

  if (noLoadedKeys[1]) return {
    stateKeys: state.keys,
  };

	const baseAsset = state.dashboard.baseAsset;
  const keys = typeof state.keys === 'object' && state.keys;
  const incomeKeys = typeof state.incomeKeys === 'object' && state.incomeKeys;
  const balancesKeys = typeof state.balancesKeys === 'object' && state.balancesKeys;
  const myFollowings = typeof state.myFollowings === 'object' && state.myFollowings;
  const myProducts = typeof state.myProducts === 'object' && state.myProducts;

  const marketKeys = getMarketplaceInvestors(state);
  const swappedKeys = [...(keys || []), ...(marketKeys || [])];

  const stateKeys = (swappedKeys || []).map(curKey => {
    const curIncome = (incomeKeys || [])
      .find(curIncome => curKey.keyId === curIncome.keyId && curIncome.baseAsset === baseAsset);
    // const curBaseBalance = curIncome && curIncome.income.baseBalance;
    const curBaseIncome = curIncome && curIncome.income.baseIncome;
    const { courDayIntervalProfit } = configs.profile.settingsShow;

    const curBalanceKeys = (balancesKeys || [])
      .find(curIncome => curKey.keyId === curIncome.keyId);
    const curTotalBalances = curBalanceKeys && curBalanceKeys.total[baseAsset];
    const curTotalBalance = (curTotalBalances && curTotalBalances.available && ({
      available: curTotalBalances.available || 0,
      hold: curTotalBalances.hold || 0,
    })) || false;

    const income = curBaseIncome && (
      curBaseIncome.length > courDayIntervalProfit ? ({
        value: curBaseIncome[curBaseIncome.length - 1].value - curBaseIncome[curBaseIncome.length - courDayIntervalProfit].value,
      }) : ({
        value: curBaseIncome[curBaseIncome.length - 1].value,
      })
    );

    const balance = curTotalBalance && {
      value: curTotalBalance,
    };

    const myFollowingsSorted = (myFollowings || [])
      .sort((curFollowing1, curFollowing2) => curFollowing2.createdAt - curFollowing1.createdAt)
      .reduce((res, curObj, arr) => {
        if (res.find(curObj2 => 
          (curObj2.follower.keyId || 0) === curObj.follower.keyId
        )) return res;
        
        res.push(curObj);

        return res;
      }, []);

    const usedFollowing = myFollowingsSorted
      .find(curMyFollowings => 
        curMyFollowings.follower.keyId === curKey.keyId
      );

    const usedProduct = (myProducts || [])
      .find(curMyProduct => curMyProduct.keyId === curKey.keyId);

    return {
      ...curKey,
      history: {
        balance,
        income,
        baseAsset,
        usedFollowing,
        usedProduct,
      },
    };
  });

  return {
  	baseAsset,
  	keys,
  	incomeKeys,
  	stateKeys,
  };
};
  
export const getDataForSmallProduct = (state) => {
  const myProducts = typeof state.myProducts === 'object' && state.myProducts;
  const keys = typeof state.keys === 'object' && state.keys;
  
  if (!myProducts || !keys) return configs.common.TYPES_RESULT['LOADING'];

  const resMyProducts = myProducts.map(curProduct => ({
    ...curProduct,
    keys,
  }));

  return resMyProducts;
};

export const getIncomeForSmallProduct = (incomeArr) => {
  const { courDayIntervalSmallProduct } = configs.profile.settingsShow;
  const curIncome = ((typeof incomeArr === 'object' && incomeArr.baseIncomeHistory) || [])
    .filter(curIncome => curIncome.value !== 1)
    .map(curIncome => ({
      ...curIncome, 
      value: (curIncome.value * 100) - 100,
    }));
  const lengthCurIncome = curIncome && curIncome.length;

  const resIncome = curIncome && (
    lengthCurIncome > courDayIntervalSmallProduct ? (
      getSlicedIncome(curIncome, courDayIntervalSmallProduct)
    ) : curIncome
  );

  const weekIncome = curIncome && (
    lengthCurIncome > 7 ? (
      getSlicedIncome(curIncome, 7)
    ) : curIncome
  );

  const monthIncome = curIncome && (
    lengthCurIncome > 30 ? (
      getSlicedIncome(curIncome, 30)
    ) : curIncome
  );

  const simulationFirstPoint = (arr) => {
    if (!arr[0]) return arr;
    
    const firstPointTime = arr[0].timestamp;
    const simulationFirstTime = moment(firstPointTime).add(-1, 'days');
    
    return [
      {value: 0, timestamp: simulationFirstTime},
      ...arr,
    ];
  };
  
  return resIncome && {
    historyIncome: simulationFirstPoint(resIncome),
    weekIncome,
    monthIncome,
  };
};

const getSlicedIncome = (income, courDay) => {
  const firstPoint = income.length > courDay ? income.length - courDay : 0;
  const incomeFirstPoint = income[firstPoint];
  const slicedIncome = income.slice(firstPoint, income.length);

  return slicedIncome.map(curIncome => ({
    ...curIncome,
    value: curIncome.value - incomeFirstPoint.value,
  }));
};

export const getIncomeForKeys = (incomeArr, courDaySliced, mode = 'PERCENT', type = 'INCOME') => {
  let {
    baseBalance,
    baseIncome, 
  } = ((typeof incomeArr === 'object' && incomeArr) || {
    baseBalance: [],
    baseIncome: [],
  });

  if (typeof baseBalance !== 'object' || !baseBalance.length) 
    return [];

  const slicedBalances_firstPoint = baseBalance.length > courDaySliced ? baseBalance.length - courDaySliced : 0;
  const slicedBalances = baseBalance
    .slice(slicedBalances_firstPoint, baseBalance.length)
    .filter(curBalance => curBalance.value > 0);
  const percentBalances = slicedBalances.map(curBalance => ({
    ...curBalance,
    value: curBalance.value / slicedBalances[0].value,
  }));

  const slicedIncomes_firstPoint = baseIncome.length > courDaySliced ? baseIncome.length - courDaySliced : 0;
  const slicedIncomes = baseIncome
    .slice(slicedIncomes_firstPoint, baseIncome.length)
    .filter((curIncome, index, arr) => ((arr[index + 1] || {value: 0}).value !== 1) || (curIncome.value !== 1));
  const absoluteIncome = slicedIncomes
    .map(curIncome => ({
      ...curIncome,
      value: curIncome.value - slicedIncomes[0].value,
    }))
    .map((curIncome, index) => ({
      ...curIncome,
      value: curIncome.value * (slicedBalances[index - 1] || {value: 0}).value,
    }));
  const showingUserIncome = slicedIncomes
    .map(curIncome => ({
      ...curIncome,
      value: (curIncome.value * 100) - 100
    }));

  return ({
    INCOME: {
      PERCENT: showingUserIncome,
      ABSOLUTE: absoluteIncome,
    },
    BALANCE: {
      PERCENT: percentBalances,
      ABSOLUTE: slicedBalances,
    },
  })[type][mode];
};

export const getNameKeys = (keys, keyId) => (
 (keys.find(curKeys => curKeys.keyId === keyId) || {name: undefined}).name
);

export const getSelectedIncomes = (keys, incomeArr, selectedAccount, selectedCourDaySliced, baseAsset, mode, type) => {
  const selectedKeys = selectedAccount === 'ALL' ? keys : [keys.find(curKeys =>
    curKeys.keyId === selectedAccount
  )];

  const incomes = selectedKeys.map(curSelectedKey => {
    const tsIncome = incomeArr.find(curIncome => 
      curIncome.keyId === curSelectedKey.keyId &&
      curIncome.baseAsset === baseAsset
    );
    const processedIncome = tsIncome && getIncomeForKeys(
      tsIncome.income, 
      selectedCourDaySliced, 
      mode, 
      type,
    );

    return {
      ...curSelectedKey,
      income: processedIncome,
      baseAsset: tsIncome && tsIncome.baseAsset,
    };
  });

  return {
    incomes,
  };
};

export const getFreeKeys = (state, atopFilter) => {
  const keys = typeof state.keys === 'object' && state.keys;
  const myProducts = typeof state.myProducts === 'object' && state.myProducts;
  const myFollowings = typeof state.myFollowings === 'object' && state.myFollowings;

  const myFollowingsSorted = (myFollowings || [])
    .sort((curFollowing1, curFollowing2) => curFollowing2.createdAt - curFollowing1.createdAt)
    .reduce((res, curObj, arr) => {
      if (res.find(curObj2 => 
        (curObj2.follower.keyId || 0) === curObj.follower.keyId
      )) return res;
      
      res.push(curObj);

      return res;
    }, []);

  const keysFiltered = (keys || [])
    .filter(curKeys =>
      curKeys.valid && 
        !(myProducts || []).find(curProduct => curProduct.keyId === curKeys.keyId) && 
          !(myFollowingsSorted || []).find(curFollowing => 
            curFollowing.follower.keyId === curKeys.keyId && curFollowing && 
              ['approved', 'wait'].includes(curFollowing.moderation)
          ) 
    )
    .filter(atopFilter || (() => true));

  return {
    keys: keysFiltered,
  };
};

export const getMarketplaceInvestors = (state) => {
  const keys = typeof state.keys === 'object' && state.keys;
  const myFollowers = typeof state.myFollowers === 'object' && state.myFollowers;

  const marketKeys = (myFollowers || [])
    .reduce((resMarketKeys, curMyFollower) => {
      const myFollowingsSorted = (curMyFollower.followings || [])
        .sort((curFollowing1, curFollowing2) => curFollowing2.createdAt - curFollowing1.createdAt)
        .reduce((res, curObj, arr) => {
          if (res.find(curObj2 => 
            (curObj2.follower.keyId || 0) === curObj.follower.keyId
          )) return res;
          
          res.push(curObj);

          return res;
        }, []);

      myFollowingsSorted.forEach(curMyFollowingsSorted => {
        const isMyKeys = (keys || []).find(curMyKeys => curMyFollowingsSorted.follower === curMyKeys.keyId);

        if (!isMyKeys) resMarketKeys.push({
          ...curMyFollowingsSorted,
          keyId: curMyFollowingsSorted.follower,
          groupName: "investor",
          comment: 'Valid key',
          valid: true,
          stock: 'binance',
          name: `${curMyFollowingsSorted.followerDetails.firstName} ${curMyFollowingsSorted.followerDetails.lastName}`,
          marketplace: true,
        });
      })

      return resMarketKeys;
    }, []);

  return marketKeys;
};

export default ({
  getMarketplaceInvestors,
  getIncomeForKeys,
  getSelectedIncomes,
	getNextKeyIdForGetIncomes,
  getNextKeyIdForGetBalances,
	getBalanceHistory,
  getValueHistory,
	getDataForSmallKeys,
  getIncomeForSmallProduct,
  getDataForSmallProduct,
  getFreeKeys,
});
