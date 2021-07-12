export const caughtError = (dispatch, loadFail, err) => {
  dispatch(loadFail(err.message));
  setTimeout(() => {
    dispatch(loadFail(null));
  }, 2000);
};
