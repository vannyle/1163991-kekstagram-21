'use strict';

(() => {
  const getRandomizedArray = (arr) => {
    const newArr = [...arr];
    return newArr.sort(() => Math.random() - 0.5);
  };

  const getSortedCommentArr = (arr) => {
    const newArr = [...arr];
    return newArr.sort((a, b) => b.comments.length - a.comments.length);
  };

  const createErrorMessage = (message) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.utils = {
    getRandomizedArray,
    getSortedCommentArr,
    createErrorMessage,
  };
})();
