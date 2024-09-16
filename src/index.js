// Импорт стилей CSS

import './pages/index.css';


// Импорт функций

import {initialCards} from './components/cards.js';
import { 
  renderCard, 
  deleteCard
} from './components/card.js';
import {
  openPopup,
  closePopup,
} from './components/modal.js'


// DOM элемент контейнера карточек

const cardContainer = document.querySelector('.places__list');

/// DOM элементы модальных окон

const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

/// DOM элементы кнопок

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');


// Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardContainer.append(renderCard(item, deleteCard));
});


// Функция открытия модального окна редактирования профиля

function openPopupEdit () {
  openPopup(popupTypeEdit);
};


// Функция открытия модального окна добавления новой карточки

function openPopupAddNewCard () {
  openPopup(popupTypeNewCard);
};


// Функция открытия модального окна картинки

function openPopupImage (event) {
  const cardImage = event.target;
  const popupCardImageImg = popupTypeImage.querySelector('.popup__image');
  const popupCardImageText = popupTypeImage.querySelector('.popup__caption');

  if (!(cardImage.classList.contains('card__image'))) return;
  
  popupCardImageImg.src = cardImage.src;
  popupCardImageImg.alt = cardImage.alt;
  popupCardImageText.textContent = cardImage.alt;
  openPopup(popupTypeImage);
};


// Обработчики событий

profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAddNewCard);
cardContainer.addEventListener('click', openPopupImage);

popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closePopup(popup);
  })
});