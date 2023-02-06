function hideShowText(blockClassName, length) {
  const shortString = (str) => {
    const sliceBoundary = (string) => string.substr(0, string.lastIndexOf(' '));
    const truncate = (n) =>
      str.length <= n ? str : `${sliceBoundary(str.slice(0, n - 1))} ...`;
    return {truncate};
  };
  const infoBlocks = document.querySelectorAll(`.${blockClassName}`);

  infoBlocks.forEach((infoBlock) => {
    const btnShow = infoBlock.querySelector(`.${blockClassName}-btn--show`);
    const btnHide = infoBlock.querySelector(`.${blockClassName}-btn--hide`);
    const textBlock = infoBlock.querySelector(`.${blockClassName}-text`);
    const textBlockStr = textBlock.innerHTML;

    const textBlockShortStr = shortString(textBlockStr);
    infoBlock.addEventListener('click', (event) => {
      const isBtnHide = event.target.classList.contains(
        `${blockClassName}-btn--hide`
      );
      const isBtnShow = event.target.classList.contains(
        `${blockClassName}-btn--show`
      );

      if (isBtnHide) {
        textBlock.innerHTML = textBlockShortStr.truncate(length);
        textBlock.classList.add(`${blockClassName}-text--short`);
        btnShow.classList.add(`${blockClassName}-btn--active`);
        btnHide.classList.add(`${blockClassName}-btn--inactive`);
      }
      if (isBtnShow) {
        textBlock.innerHTML = textBlockStr;
        textBlock.classList.remove(`${blockClassName}-text--short`);
        btnShow.classList.remove(`${blockClassName}-btn--active`);
        btnHide.classList.remove(`${blockClassName}-btn--inactive`);
      }
    });
  });
}

hideShowText('user__about', 80);
hideShowText('post__description', 108);
