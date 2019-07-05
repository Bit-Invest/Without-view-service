import configs from '@cdx/configs/';
import mixins from '@cdx/mixins/';

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
  const balance = ((arr && arr.value) || {
    available: 0,
    hold: 0,
  });

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

  const stateKeys = (keys || []).map(curKey => {
    const curIncome = (incomeKeys || [])
      .find(curIncome => curKey.keyId === curIncome.keyId && curIncome.baseAsset === baseAsset);
    // const curBaseBalance = curIncome && curIncome.income.baseBalance;
    const curBaseIncome = curIncome && curIncome.income.baseIncome;
    const { courDayIntervalProfit } = configs.profile.settingsShow;

    const curBalanceKeys = (balancesKeys || [])
      .find(curIncome => curKey.keyId === curIncome.keyId);
    const curTotalBalances = curBalanceKeys && curBalanceKeys.total[baseAsset];
    const curTotalBalance = curTotalBalances && ({
      available: curTotalBalances.available || 0,
      hold: curTotalBalances.hold || 0,
    } || {
      available: 0,
      hold: 0,
    });

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

    return {
      ...curKey,
      history: {
        balance,
        income,
        baseAsset,
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

const getSlicedIncome = (income, courDay) => {
  const firstPoint = income.length - courDay;
  const incomeFirstPoint = income[firstPoint];
  const slicedIncome = income.slice(firstPoint, income.length);

  return slicedIncome.map(curIncome => ({
    ...curIncome,
    value: curIncome.value - incomeFirstPoint.value,
  }));
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
  
  return resIncome;
};

export const getIncomeForKeys = (incomeArr, courDaySliced) => {
  const curIncome = ((typeof incomeArr === 'object' && incomeArr.baseIncome) || [])
    .filter(curIncome => curIncome.value !== 1)
    .map(curIncome => ({
      ...curIncome, 
      value: (curIncome.value * 100) - 100,
    }));
  const lengthCurIncome = curIncome && curIncome.length;

  const resIncome = curIncome && (
    lengthCurIncome > courDaySliced ? (
      getSlicedIncome(curIncome, courDaySliced)
    ) : curIncome
  );  

  return resIncome;
};

export const getNameKeys = (keys, keyId) => (
 (keys.find(curKeys => curKeys.keyId === keyId) || {name: undefined}).name
);

export const getSelectedIncomes = (keys, incomeArr, selectedAccount, selectedCourDaySliced, baseAsset) => {
  const selectedKeys = selectedAccount === 'ALL' ? keys : [keys.find(curKeys =>
    curKeys.keyId === selectedAccount
  )];

  const incomes = selectedKeys.map(curSelectedKey => {
    const tsIncome = incomeArr.find(curIncome => 
      curIncome.keyId === curSelectedKey.keyId &&
      curIncome.baseAsset === baseAsset
    );
    const processedIncome = tsIncome && getIncomeForKeys(tsIncome.income, selectedCourDaySliced);

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

  const keysFiltered = (keys || [])
    .filter(curKeys =>
      curKeys.valid && 
        !(myProducts || []).find(curProduct => curProduct.keyId === curKeys.keyId) && 
          !(myFollowings || []).find(curFollowing => curFollowing.follower === curKeys.keyId) 
    )
    .filter(atopFilter || (() => true));

  return {
    keys: keysFiltered,
  };
};

export default ({
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
