// Функция открытия модального окна

export function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupWhenEsc);
  document.addEventListener('click', closePopupWhenClickNotOverlay);
};


// Функция закрытия модального окна

export function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
};


// Фунция закрытия модального окна по кнопке ESC

function closePopupWhenEsc (event) {
  const openPopup = document.querySelector('.popup_is-opened');
  
  if (event.key === 'Escape') {
    closePopup(openPopup);
    document.removeEventListener('keydown', closePopupWhenEsc);
  };
};

// Фунция закрытия модального окна по клику вне модального окна

function closePopupWhenClickNotOverlay (event) {
  const openPopup = document.querySelector('.popup_is-opened');
  
  if (event.target.classList.contains('popup')) {
    closePopup(openPopup);
    document.removeEventListener('click', closePopupWhenClickNotOverlay);
  };
};