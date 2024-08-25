// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function renderCard (elementCard, deleteCard) {
  const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);

  itemCard.querySelector('.card__image').src = elementCard.link;
  itemCard.querySelector('.card__image').alt = elementCard.name;
  itemCard.querySelector('.card__title').textContent = elementCard.name;
  itemCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return itemCard;
};

// @todo: Функция удаления карточки

function deleteCard () {
  event.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardContainer.append(renderCard(item, deleteCard));
});
