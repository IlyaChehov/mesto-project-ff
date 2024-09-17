// DOM элемент Темплейт(Шаблон)
const cardTemplate = document.querySelector('#card-template').content;

// Функция добавления карточки
export function renderCard (elementCard, deleteCard, openPopupImage, addAndRemoveLike) {
  const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const itemImage = itemCard.querySelector('.card__image');
  const itemButton = itemCard.querySelector('.card__like-button');

  itemImage.src = elementCard.link;
  itemImage.alt = elementCard.name;
  itemCard.querySelector('.card__title').textContent = elementCard.name;
  itemCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  itemImage.addEventListener('click', () => {openPopupImage(itemImage)});
  itemButton.addEventListener('click', () => {addAndRemoveLike(itemButton)});

  return itemCard;
};

// Функция удаления карточки
export function deleteCard (event) {
  event.target.closest('.places__item').remove();
};

// Функция добавления / удаления лайка
export function addAndRemoveLike (button) {
  button.classList.toggle('card__like-button_is-active');
};