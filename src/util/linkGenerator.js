import {userAgent} from "./userAgent";

const URL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const giphyURL = /https:\/\/.?media[0-9].giphy.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const image = /uploads\/images\\[-a-zA-Z0-9]{0,256}\.[a-z]{2,6}/;

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const linkGenerator = (text) => {
  let replaced;
  if (text != null) {
    replaced = text;

    if (text.match(URL) !== null) {
      text.match(URL).forEach((link) => {
        replaced = replaced.replace(
          link,
          `<a target="_blank" href="${link}">${link}</a>`
        );
      });
    }
  }
  return replaced;
};

export const imageGenerator = (text) => {
  let replaced;
  if (text != null) {
    replaced = text;

    if (text.match(image) !== null) {
      text.match(image).forEach((link) => {
        const imgLink = `http://${localhost}:8080/${link}`;
        replaced = replaced.replace(
          link,
          `<img src=${imgLink} width=${360} alt=${link}  />`
        );
      });
    }
  }
  return replaced;
};
export const gifGenerator = (text) => {
  let replaced;
  if (text != null) {
    replaced = text;

    if (text.match(giphyURL) !== null) {
      text.match(giphyURL).forEach((link) => {
        replaced = replaced.replace(
          link,
          `<img src=${link} width=${360} alt=${link}  />`
        );
      });
    }
  }
  return imageGenerator(replaced);
};
