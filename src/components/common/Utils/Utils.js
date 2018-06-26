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

export const convertDateForTerminal = (timestamp) => {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1 > 9 ?
    date.getMonth() + 1 :
    `0${date.getMonth() + 1}`
  );
  const day = (date.getDate() > 9 ?
    date.getDate() :
    `0${date.getDate()}`
  );
  const year = `${date.getFullYear().toString()[2]}${date.getFullYear().toString()[3]}`;
  return `${day}.${month}.${year}`;
}
