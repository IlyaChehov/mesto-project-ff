// DOM элемент Темплейт(Шаблон)
const cardTemplate = document.querySelector('#card-template').content;

// Функция добавления карточки
export function renderCard (card, cardId, deleteCard, openPopupImage, addAndRemoveLike) {
  const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const itemImage = itemCard.querySelector('.card__image');
  const itemButton = itemCard.querySelector('.card__like-button');
  const likeCounter = itemCard.querySelector('.card__like-counter');
  const deleteButton = itemCard.querySelector('.card__delete-button');

  itemImage.src = card.link;
  itemImage.alt = card.name;
  itemCard.dataset.id = cardId;
  likeCounter.textContent = card.likes.length;
  itemCard.querySelector('.card__title').textContent = card.name;

  if (cardId !== card.owner._id) {
    deleteButton.remove();
  };

  deleteButton.addEventListener('click', deleteCard);
  itemImage.addEventListener('click', () => {openPopupImage(card)});
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