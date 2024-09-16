const cardTemplate = document.querySelector('#card-template').content;

export function renderCard (elementCard, deleteCard) {
  const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const itemImage = itemCard.querySelector('.card__image');

  itemImage.src = elementCard.link;
  itemImage.alt = elementCard.name;
  itemCard.querySelector('.card__title').textContent = elementCard.name;
  itemCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return itemCard;
};

export function deleteCard (event) {
  event.target.closest('.places__item').remove();
};

