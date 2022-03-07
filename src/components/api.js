class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //парсим ответ сервера
  getResponseData (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  //грузим юзера
  getUser () {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      .then(res => this.getResponseData(res));
  };
  //грузим карточки
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this.getResponseData(res))
  }

  //грузим начальные данные с сервера
  getAppInfo () {
    return Promise.all([this.getUser(), this.getCards()]);
  }

  //удаляем лайк с карточки на сервере
  deleteLike (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',//убираем лайк
      headers: this._headers
    })
    .then(res => this.getResponseData(res));
  } 

  //ставим лайк на сервере
  putLike (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',//ставим лайк классной карточке
      headers: this._headers
    })
    .then(res => this.getResponseData(res))
  }

  //удаляем карточку с сервера
  deleteCard (cardId) {
    return   fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this.getResponseData(res))
  }

  //рендерим новую карточку на сервере
  cardRenderServer (name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this.getResponseData(res))
  }

  //отправляем новую автарку серверу
  sendNewAvatar (link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(res => this.getResponseData(res))
  }

  //отправляем новые данные профиля
  sendProfileData (name, about) {
    return  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this.getResponseData(res))
  }
}

export const api = new Api('https://nomoreparties.co/v1/plus-cohort-6', {
  authorization: '64f73e63-60f2-487f-9d1f-1d8ea3c050e0',
  'Content-Type': 'application/json'
}); //создаем экземпляр класса апи

export default api


