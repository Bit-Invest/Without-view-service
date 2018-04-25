export const signIn = async () => {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, 500));
};

export const signUp = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('ERROR');
    }, 500);
  });
}

export const resetPassword = async () => {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, 500))
};
