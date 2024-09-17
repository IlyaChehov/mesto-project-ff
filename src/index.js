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
  const NewCardElement = {};
  
  NewCardElement.name = inputNewPlaceName.value;
  NewCardElement.link = inputNewPlaceLink.value;
  cardContainer.prepend(renderCard(NewCardElement, deleteCard, openPopupImage, addAndRemoveLike));
  closePopup(popupTypeNewCard);
  formNewPlace.reset();
};

// Функция открытия модального окна картинки
function openPopupImage (elementPopup) {
  const popupImg = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImg.src = elementPopup.src;
  popupImg.alt = elementPopup.alt;
  popupCaption.textContent = elementPopup.alt;
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