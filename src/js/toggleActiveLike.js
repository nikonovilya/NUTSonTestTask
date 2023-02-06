function toggleActiveLike(btnClasName) {
  const likeBtns = document.querySelectorAll(
    `.${btnClasName}.${btnClasName}--like`
  );

  likeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains(`${btnClasName}--active`);

      if (isActive) {
        btn.classList.remove(`${btnClasName}--active`);
      } else {
        btn.classList.add(`${btnClasName}--active`);
      }
    });
  });
}
toggleActiveLike('post__actions-btn');
