import { 
  deleteCardToServe, 
  addCardLike, 
  removeCardLike 
} from "./api.js";

// DOM элемент Темплейт(Шаблон)
const cardTemplate = document.querySelector("#card-template").content;

// Функция добавления карточки
export function renderCard(
  card,
  profileId,
  deleteCard,
  openPopupImage,
  addOrRemoveLike) {
  const itemCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const itemImage = itemCard.querySelector(".card__image");
  const itemButton = itemCard.querySelector(".card__like-button");
  const likeCounter = itemCard.querySelector(".card__like-counter");
  const deleteButton = itemCard.querySelector(".card__delete-button");

  itemImage.src = card.link;
  itemImage.alt = card.name;
  itemCard.dataset.id = card._id;
  likeCounter.textContent = card.likes.length;
  itemCard.querySelector(".card__title").textContent = card.name;

  if (profileId !== card.owner._id) {
    deleteButton.remove();
  }

  if (checkIsLike(card, profileId)) {
    itemButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", deleteCard);
  itemImage.addEventListener("click", () => {
    openPopupImage(card);
  });
  itemButton.addEventListener("click", () => {
    addOrRemoveLike(card, profileId, itemButton, likeCounter);
  });

  return itemCard;
}

// Функция удаления карточки
export function deleteCard(event) {
  const cardItem = event.target.closest(".places__item");
  const cardId = cardItem.dataset.id;

  deleteCardToServe(cardId).catch((err) => `Ошибка: ${err}`);

  cardItem.remove();
}

// Функция проверки лайка
export function addOrRemoveLike(
  card, 
  profileId, 
  itemButton, 
  likeCounter) {
  if (checkIsLike(card, profileId)) {
    removeCardLike(card._id).then((data) => {
      itemButton.classList.remove("card__like-button_is-active");
      likeCounter.textContent = data.likes.length;
      card.likes = data.likes;
    }).catch(err => console.log(`Ошибка: ${err}`));
  } else {
    addCardLike(card._id).then((data) => {
      itemButton.classList.add("card__like-button_is-active");
      likeCounter.textContent = data.likes.length;
      card.likes = data.likes;
    }).catch(err => console.log(`Ошибка: ${err}`));
  };
};

function checkIsLike(data, profileId) {
  return data.likes.some((item) => {
    return item._id === profileId;
  });
};
