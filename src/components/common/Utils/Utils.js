export const allExclude = (key, obj) => {
  let result = {};
  Object.keys(obj).forEach(item => {
    if (item !== key) {
      result[item] = obj[item];
    }
  })
  return result;
}
