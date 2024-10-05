// Импорт стилей CSS
import './pages/index.css';

// Импорт функций
import {initialCards} from './components/cards.js';
import { 
  renderCard, 
  deleteCard,
  addAndRemoveLike
} from './components/card.js';
import {
  openPopup,
  closePopup,
} from './components/modal.js';

// DOM элемент контейнера карточек
const cardContainer = document.querySelector('.places__list');

// DOM элементы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// DOM элементы модальных окон
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImg = document.querySelector('.popup_type_image');

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

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardContainer.append(renderCard(item, deleteCard, openPopupImage, addAndRemoveLike));
});

// Добавляем анимацию 'затухания' на все попапы
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

// Функция открытия модального окна редактирования профиля
function openPopupEdit () {
  inputEditProfileName.value = profileTitle.textContent;
  inputEditProfileDecsription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
};

// Функция открытия модального окна добавления новой карточки
function openPopupAddNewCard () {
  openPopup(popupTypeNewCard);
};

// Функция редактирования профиля
function editProfile (event) {
  event.preventDefault();
  profileTitle.textContent = inputEditProfileName.value;
  profileDescription.textContent = inputEditProfileDecsription.value;
  closePopup(popupTypeEdit);
};

// Функция добавления новой карточки
function addNewCard (event) {
  event.preventDefault();
  const newCardElement = {
    name: inputNewPlaceName.value,
    link: inputNewPlaceLink.value,
  };
  cardContainer.prepend(renderCard(newCardElement, deleteCard, openPopupImage, addAndRemoveLike));
  closePopup(popupTypeNewCard);
  formNewPlace.reset();
};

// Функция открытия модального окна картинки
function openPopupImage (cardData) {
  const popupImg = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupTypeImg);
};

// Обработчики событий
profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAddNewCard);
popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closePopup(popup);
  })
});
formEditProfile.addEventListener('submit', editProfile);
formNewPlace.addEventListener('submit', addNewCard);

/////////////////////////////////

const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation (validationData);

function enableValidation (validationData) {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));

  formList.forEach((formElement) => {
    setEventListener (formElement);
  });
};

function setEventListener (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid (formElement, inputElement);
    })
  });
};

function isValid (formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity('');
  };

  if (!inputElement.validity.valid) {
    showInputError (formElement, inputElement, inputElement.validationMessage);
  } else {
    hiddenInputError (formElement, inputElement);
  };
};

function showInputError (formElement, inputElement, errorMessage) {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

 inputElement.classList.add(validationData.inputErrorClass);
 errorElement.textContent = errorMessage;
 errorElement.classList.add(validationData.errorClass);
};

function hiddenInputError (formElement, inputElement) {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

 inputElement.classList.remove(validationData.inputErrorClass);
 errorElement.classList.remove(validationData.errorClass);
 errorElement.textContent = '';
};