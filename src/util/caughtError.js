export const caughtError = (dispatch, loadFail, err) => {
    console.log(err.message);
    dispatch(loadFail(err.message));
    setTimeout(() => {
        dispatch(loadFail(null));
    }, 2000);
};