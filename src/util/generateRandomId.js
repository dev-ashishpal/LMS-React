// let array = new Uint32Array(10);
// window.crypto.getRandomValues(array);
//
// console.log("Your lucky numbers:");
// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
// }

export const generateUniqueID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
