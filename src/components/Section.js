import {api} from './Api.js';

// export const formAddNewCard = document.querySelector(".popup__form_type_cards");

export class Section {
  constructor({renderer}, cardListSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(cardListSelector); 
  }

  clear() {
    this._container.innerHTML = '';
  }

  //отрисовывем новую карточку с помощью _renderer
  addItem( cardCloneElement) {
    this._container.prepend(cardCloneElement)
  }

  //отрисовывем начальныее карточки с помощью _renderer
  renderItems(cardsData) {
    cardsData.reverse().forEach(data => {
      this._renderer(data); 
    })
  }
  
}

//поставить лайк
export function handleCardLikeClick (evt, cardId) {   //в кард приватный метод
  if(evt.target.classList.contains('card__button_active')){
    api.deleteLike(cardId)
    .then(res => evt.target.parentElement.querySelector('.card__likes').textContent = res.likes.length)
    .then((_) => evt.target.classList.toggle('card__button_active'))
    .catch((res)=>{console.log(res)}); 
  }else {
    api.putLike(cardId)
    .then(res => evt.target.parentElement.querySelector('.card__likes').textContent = res.likes.length)
    .then((_) => evt.target.classList.toggle('card__button_active'))
    .catch((res)=>{console.log(res)});
  }
};

//удалить карточку нажатием на корзинку 
export function handleCardDeleteClick(evt, cardId) {      //в кард приватный метод
  api.deleteCard(cardId)
  .then((_) => evt.target.closest('.card').remove())
  .catch((res)=>{console.log(res)});
};