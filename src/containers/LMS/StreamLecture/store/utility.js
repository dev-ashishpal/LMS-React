export const updateObject = (oldObject, newValue) => {
  return {
    ...oldObject,
    ...newValue,
  };
};
