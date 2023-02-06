function openClosePopup(popupClassName) {
  const popup = document.querySelector(`.${popupClassName}`);
  const popupWrapper = popup.querySelector(`.${popupClassName}__wrapper`);
  const postTemplate = document.querySelector('.post.post--template');

  const body = document.querySelector('body');
  const postList = document.querySelector(
    '.profile__content-list.profile__content-list--desktop'
  );
  const posts = postList.querySelectorAll('.post');

  const openPopupHandler = () => {
    popup.classList.add(`${popupClassName}--active`);
    body.classList.add('overflow-hidden');
  };
  const closePopupHandler = (e) => {
    const isSliderElem = e.target.closest('.slider');

    if (!isSliderElem) {
      popup.classList.remove(`${popupClassName}--active`);
      body.classList.remove('overflow-hidden');
    }
  };

  posts.forEach((post) => {
    post.addEventListener('click', () => {
      if (postTemplate) {
        const postImg = post.querySelector('.post__content-img');
        const postTemplateImg =
          postTemplate.querySelector('.post__content-img');
        console.log(postTemplateImg);
        console.log(postImg.currentSrc);
      }
      openPopupHandler();
    });
  });
  popupWrapper.addEventListener('click', closePopupHandler);
}
openClosePopup('popup');
