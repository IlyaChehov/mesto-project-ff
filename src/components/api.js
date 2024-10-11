const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '08e81afe-9f10-459f-9a5e-d3c0212e073d',
    'Content-Type': 'application/json'
  }
};

// Функция проверки запроса
function checkStatus (data) {
  return data.ok ? data.json() : Promise.reject(`Ошибка: ${data.status}`);
};

// Функция получения данных о пользователе с сервера
export function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkStatus(res));
};

// Функция получения массива карточек с сервера
export function getCardsFromServer () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => checkStatus(res));
};

// Функция отправки данных профиля на сервер
function setEditProfile (name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(res => checkStatus(res));
};

// Функция отправки новой карточки на сервер
function getNewCardToServe (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => checkStatus(res));
};

function deleteCardToServe (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkStatus(res));
};

function addCardLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkStatus(res));
};

function removeCardLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkStatus(res));
};

function changeAvatar () {

};