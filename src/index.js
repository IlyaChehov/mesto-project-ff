// Импорт стилей CSS
import './pages/index.css';

// Импорт функций
import { 
  renderCard, 
  deleteCard,
  addOrRemoveLike
} from './components/card.js';

import {
  openPopup,
  closePopup,
} from './components/modal.js';

import {
  enableValidation,
  clearValidation
} from './components/validation.js'

import {
  getUserInfo,
  getCardsFromServer,
  setEditProfile,
  getNewCardToServe,
  changeAvatar
} from './components/api.js';

// DOM элемент контейнера карточек
const cardContainer = document.querySelector('.places__list');

// DOM элементы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

// DOM элементы модальных окон
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// DOM элементы кнопок
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// DOM элементы форм
const formEditProfile = document.forms['edit-profile'];
const inputEditProfileName = formEditProfile.name;
const inputEditProfileDecsription = formEditProfile.description;
const formNewPlace = document.forms['new-place'];
const inputNewPlaceName = formNewPlace['place-name'];
const inputNewPlaceLink = formNewPlace.link;
const formEditAvatar = document.forms['edit-avatar'];
const inputEditAvatar = formEditAvatar.link_avatar;
const formButtonEditProfile = formEditProfile.querySelector('.popup__button');
const formButtonNewPlace = formNewPlace.querySelector('.popup__button');
const formButtonEditAvatar = formEditAvatar.querySelector('.popup__button');

// Классы для валидации форм
const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

Promise.all([getUserInfo(), getCardsFromServer()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`;

    cards.forEach((card) => {
      cardContainer.append(
        renderCard (
          card,
          profile._id,
          deleteCard,
          openPopupImage,
          addOrRemoveLike)
      );
    });
  }).catch(err => console.log(`Ошибка: ${err}`));

function toggleTextButton (button, boolean) {
  if (boolean) {
    button.textContent = 'Сохранение...'
  } else {
     button.textContent = 'Сохранение'
  }
}

// Добавляем анимацию 'затухания' на все попапы
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

// Функция открытия модального окна редактирования профиля
function openPopupEdit () {
  inputEditProfileName.value = profileTitle.textContent;
  inputEditProfileDecsription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationData);
  openPopup(popupTypeEdit);
};

function openPopupEditAvatar () {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationData);
  openPopup(popupTypeAvatar);
};

// Функция открытия модального окна добавления новой карточки
function openPopupAddNewCard () {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationData);
  openPopup(popupTypeNewCard);
};

// Функция редактирования профиля
function editProfile (event) {
  event.preventDefault();

  const name = inputEditProfileName.value;
  const about = inputEditProfileDecsription.value;

  toggleTextButton (formButtonEditProfile, true);

  setEditProfile (name, about)
    .then(() => {
      profileTitle.textContent = name;
      profileDescription.textContent = about;
      closePopup(popupTypeEdit);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      toggleTextButton (formButtonEditProfile, false);
    })
  formEditProfile.reset();
};

// Функция добавления новой карточки
function addNewCard (event) {
  event.preventDefault();

  const name = inputNewPlaceName.value;
  const link = inputNewPlaceLink.value;

  toggleTextButton (formButtonNewPlace, true);

  getNewCardToServe(name, link)
    .then(data => {
      cardContainer.prepend(
        renderCard(
          data, 
          data.owner._id, 
          deleteCard, 
          openPopupImage, 
          addOrRemoveLike));
      closePopup(popupTypeNewCard);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {toggleTextButton (formButtonNewPlace, false);
    });
    
  formNewPlace.reset();
};

function addNewAvatar (event) {
  event.preventDefault();

  const avatarLink = inputEditAvatar.value;

  toggleTextButton (formButtonEditAvatar, true);

  changeAvatar(avatarLink)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupTypeAvatar);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      toggleTextButton (formButtonEditAvatar, false);
    });

  formEditAvatar.reset();
}

// Функция открытия модального окна картинки
function openPopupImage (cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupTypeImg);
};

enableValidation(validationData);

// Обработчики событий
profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAddNewCard);
profileAvatar.addEventListener('click', openPopupEditAvatar);
formEditProfile.addEventListener('submit', editProfile);
formNewPlace.addEventListener('submit', addNewCard);
formEditAvatar.addEventListener('submit', addNewAvatar);
popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closePopup(popup);
  });
});
