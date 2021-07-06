import { userAgent } from "./userAgent";

const URL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gim;
const giphyURL = /https:\/\/.?media[0-9].giphy.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
const image = /uploads\\images\\[-a-zA-Z0-9]{0,256}\.[a-z]{2,6}/;

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const linkGenerator = (text) => {
  let replaced;
  if (text != null) {
    replaced = text;

    if (text.match(URL) !== null) {
      let mailto = "";
      text.match(URL).forEach((link) => {
        if (link.indexOf("@") > 0) {
          mailto = "mailto:";
        }
        replaced = replaced.replace(
          link,
          `<a rel="noreferrer nofollow" target="_blank" href="${
            mailto + link
          }">${link}</a>`
        );
      });
    }
    // if (replaced.match(/\*\*(.*)\*\*/gim) !== null) {
    //   replaced.match(/\*\*(.*)\*\*/gim).forEach((element) => {
    //     console.log(element);
    //     replaced = replaced.replace(element, `<b>${element}</b>`);
    //   });
    // }
  }
  return replaced;
};

export const parseMarkdown = (text) => {
  // console.log(text);
  const htmlText = text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // .replace(/\*\*(.*\S)\*\*/gim, "<b>$1</b>")
    // .replace(/\*(.*\S)\*/gim, "<i>$1</i>")
    .replace(/\n$/gim, "<br />");
  // .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>");

  return linkGenerator(htmlText);
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
