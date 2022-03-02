import {Card} from './card.js'
import {userId} from './profile.js'
import {api} from './Api.js';
import {openPopup, closePopup} from "./utils.js";

const newCardPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
export const formAddNewCard = document.querySelector(".popup__form_type_cards");
const cardNameInput = newCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_link');
const submitCardButton = newCardPopup.querySelector('.popup__button');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__name');
const templateSelector = '#card-template';
const cardListSelector = '.cards__list'; 

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
    //this.clear(); //чистим карточки
    cardsData.reverse().forEach(data => {
      this._renderer(data); //renderCard(cardList, new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector).generate())
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

//открываем попап конкретной карточки
//export function handleCardBigClick (event) { 
  //openPopup(imagePopup);
  //imagePopupImage.src = event.target.src;
  //imagePopupImage.alt = event.target.alt;
  //imageCaption.textContent = event.target.alt;
//};

//рендерим новую карточку 
import {disableButton} from './validate.js'
import {options} from './index.js'
import {section} from './index.js'

/*export const handleSubmitNewCard = (evt) => { //popupWithForm
  evt.preventDefault();
  submitCardButton.textContent = "Сохранение...";
  api.cardRenderServer(cardNameInput.value, cardLinkInput.value)  //отправили на сервер
  .then((data)=> {  
  section._renderer(data);  //renderCard(cardList, new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector).generate())
    formAddNewCard.reset();   //ресетим форму
    disableButton(submitCardButton, options.inactiveButtonClass)    
    closePopup(newCardPopup);
  })
  .catch((res) => {console.log(res)})
  .finally(() => {submitCardButton.textContent = "Создать"})
};*/

