import {api} from '../pages/index.js';

export class Section {
  constructor({renderer}, cardListSelector) {
    this.renderer = renderer;
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
      this.renderer(data); 
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
