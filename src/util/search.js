export const search = (event, lectureRef) => {
  const textInput = event.target.value;
  const articles = lectureRef.current.querySelectorAll("article") || lectureRef.current.querySelectorAll('a');

  articles.forEach((article) => {
    const title = article.querySelector("h3").textContent || article.querySelector('h5').textContent;
    if (title.toUpperCase().indexOf(textInput.toUpperCase()) > -1) {
      article.style.display = "grid";
    } else {
      article.style.display = "none";
    }
  });
};

export const advanceSearch = (event, lectureRef) => {
  const textInput = event.target.value;
  const articles = lectureRef.current.querySelectorAll("article") || lectureRef.current.querySelectorAll('a');

  articles.forEach((article) => {
    const name = article.querySelector("h1 span").textContent;
    const roll = article.querySelector("h2").textContent;
    const title = name.concat(roll);

    if (title.toUpperCase().indexOf(textInput.toUpperCase()) > -1) {
      article.style.display = "grid";
    } else {
      article.style.display = "none";
    }
  });
};
