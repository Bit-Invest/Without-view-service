export const allExclude = (key, obj) => {
  let result = {};
  Object.keys(obj).forEach(item => {
    if (item !== key) {
      result[item] = obj[item];
    }
  })
  return result;
}

export const findBurseAndChangeStatus = (burse, arr) => {
  let result = arr;
  result.map(stock => {
    let res = stock;
    if (res.stock === burse.nameStock) {
      res.status = burse.status;
    }
    return res;
  });
  return result;
}
