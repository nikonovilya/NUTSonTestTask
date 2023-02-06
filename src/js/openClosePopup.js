function openClosePopup(popupClassName) {
  const imgTemplate = (filename, altText) => {
    const template = `
      <source srcset="./img/${filename}@1x.avif 1x, ./img/${filename}@2x.avif 2x "type="image/avif" />
      <source srcset="./img/${filename}@1x.webp 1x, ./img/${filename}@2x.webp 2x" type="image/webp" />
      <img
        class="post__content-img"
        src="./img/${filename}@1x.jpg"
        srcset="./img/${filename}@2x.jpg 2x"
        alt="${altText}"
      />
    `;
    return template;
  };
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
        const img = post.querySelector('.post__content-img');
        const imgSrc = img.currentSrc;
        const imgAltText = img.getAttribute('alt');
        const templatePicture = postTemplate.querySelector(
          '.post__content-picture'
        );
        const filename = imgSrc.split('/').pop().split('@')[0];
        templatePicture.innerHTML = imgTemplate(filename, imgAltText);
      }
      openPopupHandler();
    });
  });
  popupWrapper.addEventListener('click', closePopupHandler);
}
openClosePopup('popup');
