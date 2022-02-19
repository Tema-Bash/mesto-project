export class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //парсим ответ сервер
  getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  //грузим юзера
  getUser () {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      })
      .then((res) => this.getResponseData(res));
  };

  //грузим карточки
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
      .then(res => this.getResponseData(res));
  };

  //грузим начальные данные с сервера
  getAppInfo() {
    return Promise.all([this.getUser(), this.getCards()]);
  };

  //удаляем лайк с карточки на сервере
  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',//убираем лайк
      headers: this.headers
    })
    .then(res => this.getResponseData(res));
  };
  
  //ставим лайк на сервере
  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',//ставим лайк классной карточке
      headers: this.headers
    })
    .then((res) => this.getResponseData(res));
  };
  
  //удаляем карточку с сервера
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then((res) => this.getResponseData(res));
  };

  //рендерим новую карточку на сервере
  cardRenderServer(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => this.getResponseData(res));
  };

  //отправляем новую автарку серверу
  sendNewAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => this.getResponseData(res));
  };

  //отправляем новые данные профиля
  sendProfileData(name, about) {
    return  fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => this.getResponseData(res));
  };

}











