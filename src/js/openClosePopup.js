function openClosePopup(popupClassName) {
  const popup = document.querySelector(`.${popupClassName}`);
  const popupOverlay = popup.querySelector(`.${popupClassName}__overlay`);

  const body = document.querySelector('body');
  const postList = document.querySelector(
    '.profile__content-list.profile__content-list--desktop'
  );
  const posts = postList.querySelectorAll('.post');

  const openPopupHandler = () => {
    popup.classList.add(`${popupClassName}--active`);
    body.classList.add('overflow-hidden');
    console.log('click')
  };
  const closePopupHandler = () => {
    popup.classList.remove(`${popupClassName}--active`);
    body.classList.remove('overflow-hidden');
  };

  posts.forEach((post) => {
    post.addEventListener('click', openPopupHandler);
  });
  popupOverlay.addEventListener('click', closePopupHandler);
}
openClosePopup('popup');
