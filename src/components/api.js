const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '64f73e63-60f2-487f-9d1f-1d8ea3c050e0',
    'Content-Type': 'application/json'
  }
}

//парсим ответ сервера
export const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
//грузим юзера
const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(res => getResponseData(res));
};
//грузим карточки
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => getResponseData(res));
};
//грузим начальные данные с сервера
export const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};

//удаляем лайк с карточки на сервере
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',//убираем лайк
    headers: config.headers
  })
  .then(res => getResponseData(res));
} 

//ставим лайк на сервере
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',//ставим лайк классной карточке
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

//удаляем карточку с сервера
export const deleteCard = (cardId) => {
  return   fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

//рендерим новую карточку на сервере
export const cardRenderServer = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => getResponseData(res))
}


//отправляем новую автарку серверу
export const sendNewAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
}

//отправляем новые данные профиля
export const sendProfileData = (name, about) => {
  return  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}









