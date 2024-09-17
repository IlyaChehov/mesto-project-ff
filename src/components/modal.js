// Функция открытия модального окна
export function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupWhenClickNotOverlay);
  document.addEventListener('keydown', closePopupWhenEsc);
};

// Функция закрытия модального окна
export function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupWhenEsc);
  document.removeEventListener('click', closePopupWhenClickNotOverlay);
};

// Фунция закрытия модального окна по кнопке ESC
function closePopupWhenEsc (event) {
  const openPopup = document.querySelector('.popup_is-opened');
  
  if (event.key === 'Escape') {
    closePopup(openPopup);
  }
};

// Фунция закрытия модального окна по клику вне модального окна
function closePopupWhenClickNotOverlay (event) {
  const openPopup = document.querySelector('.popup_is-opened');

  if (event.target.classList.contains('popup')) {
    closePopup(openPopup);
  }
};