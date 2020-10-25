const DEBOUNCE_INTERVAL = 500;

const getRandomizedArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const getSortedCommentArr = (arr) => {
  return [...arr].sort((a, b) => b.comments.length - a.comments.length);
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

const createErrorMessage = (message) => {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = `0`;
  node.style.right = `0`;
  node.style.fontSize = `30px`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.utils = {
  getRandomizedArray,
  getSortedCommentArr,
  debounce,
  createErrorMessage,
};
