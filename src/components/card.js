//функции для работы с карточками проекта Mesto
import {openPopup,closePopup} from "./utils.js";
import {api} from './Api.js';
import {userId} from './profile.js'
import {disableButton} from './validate.js'
import {options} from './index.js'

const newCardPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
export const formAddNewCard = document.querySelector(".popup__form_type_cards");
const cardNameInput = newCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.cards__list'); 
const cardTemplate = document.querySelector('#card-template').content;  
const submitCardButton = newCardPopup.querySelector('.popup__button');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__name');
//-------------------------------------------------------------------------------------------------------------------------------------------------
//класс Card - код, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  //принимает в конструктор её данные и селектор её template-элемента;
  constructor({ data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector){
    this._selector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = userId;

    this._handleCardBigClick = handleCardBigClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
  }

  //возвращает шаблон разметки
  _getElement() {
    return document
      .querySelector(this._selector)  //'#card-template'
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  //Работаем с разметкой собираем все компоненты карточки
  generate () {
    this._element = this._getElement();  //const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
    const _elementImage = this._element.querySelector('.card__image')
    _elementImage.src = this._link;    //cardCloneElementImage.src = link;
    _elementImage.alt = this._name;    //cardCloneElementImage.alt = name;
    this._element.querySelector('.card__likes').textContent = this._likes.length; //likesCount.textContent = likes.length;
    this._element.querySelector('.card__title').textContent = this._name;  //cardCloneElement.querySelector('.card__title').textContent = name;
    
    //отображение моих лайков
    const isLiked = Boolean(this._likes.find(user => user._id === this._currentUserId)); //должно быть вне
    if(isLiked){
      this._element.querySelector('.card__button').classList.toggle('card__button_active')
    }

    //отображение иконки корзинки если карточка наша
    const isOwner = this._ownerId === this._currentUserId;
    if(!isOwner){
      this._element.querySelector('.card__delete').classList.add('card__delete_visibility_hidden');
    };
    //вызываем обработчики
    this._setEventListeners();

    return this._element;
  }

  //вешаем обработчики
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', this._handleCardBigClick);
    this._element.querySelector('.card__delete').addEventListener('click', (evt) => this._handleCardDeleteClick(evt, this._cardId));
    this._element.querySelector('.card__button').addEventListener('click', (evt) => this._handleCardLikeClick(evt, this._cardId));
  }
}


//-------------------------------------------------------------------------------------------------------------------------------------------------
//поставить лайк
/*function handleCardLikeClick (evt, cardId) {
  if(evt.target.classList.contains('card__button_active')){
    new Api().deleteLike(cardId)
    .then(res => evt.target.parentElement.querySelector('.card__likes').textContent = res.likes.length)
    .then((_) => evt.target.classList.toggle('card__button_active'))
    .catch((res)=>{console.log(res)}); 
  }else {
    new Api().putLike(cardId)
    .then(res => evt.target.parentElement.querySelector('.card__likes').textContent = res.likes.length)
    .then((_) => evt.target.classList.toggle('card__button_active'))
    .catch((res)=>{console.log(res)});
  }
};

  //удалить карточку нажатием на корзинку 
  function handleCardDeleteClick(evt, cardId) {
    new Api().deleteCard(cardId)
    .then((_) => evt.target.closest('.card').remove())
    .catch((res)=>{console.log(res)});
  };

  //открываем попап конкретной карточки
  function handleCardBigClick (event) {   //в кард
    openPopup(imagePopup);
    imagePopupImage.src = event.target.src;
    imagePopupImage.alt = event.target.alt;
    imageCaption.textContent = event.target.alt;
  };*/

//создаем карточку
/*export const createCard = (name, link, likes, cardId, ownerId, currentUserId, handleLikeClick, handleDeleteClick) => {  //
  const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardCloneElementImage = cardCloneElement.querySelector('.card__image');
  const likesCount = cardCloneElement.querySelector('.card__likes');
  cardCloneElementImage.src = link;
  cardCloneElementImage.alt = name;
  likesCount.textContent = likes.length; //число лайков
  cardCloneElement.querySelector('.card__title').textContent = name;

  //отображение моих лайков
  const likeIcon = cardCloneElement.querySelector('.card__button');
  const isLiked = Boolean(likes.find(user => user._id === currentUserId));
  if(isLiked){
    likeIcon.classList.toggle('card__button_active')
  }

  cardCloneElementImage.addEventListener('click', handleCardBigClick)
  cardCloneElement.querySelector('.card__button').addEventListener('click', (evt) => handleCardLikeClick(evt, cardId));

  //удаляем корзинку если карточка не наша
  const deleteElement = cardCloneElement.querySelector('.card__delete');
  const isOwner = ownerId === currentUserId;
  if(!isOwner){
    deleteElement.classList.add('card__delete_visibility_hidden');
  };
  cardCloneElement.querySelector('.card__delete').addEventListener('click',(evt)=> handleCardDeleteClick(evt, cardId));
  return cardCloneElement
}*/
/*
//добавляем карточку в начало страницы
export function renderCard(cardList, cardCloneElement) {    //в Секшн
  cardList.prepend(cardCloneElement)
};
*/
/*
//рендерим новую карточку 
export const handleSubmitNewCard = (evt) => {   //в секшн

  evt.preventDefault();
  submitCardButton.textContent = "Сохранение...";
  new Api().cardRenderServer(cardNameInput.value, cardLinkInput.value)  //отправили на сервер
  .then((data)=> {  
  const templateSelector = '#card-template';
  renderCard(cardList, new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector).generate())
    formAddNewCard.reset();   //ресетим форму
    disableButton(submitCardButton, options.inactiveButtonClass)    
    closePopup(newCardPopup);
  })
  .catch((res) => {console.log(res)})
  .finally(() => {submitCardButton.textContent = "Создать"})
};
*/
/*
//рендерим начальный массив
export const renderInitialArray = (initialCards) => { //в секшн
  const templateSelector = '#card-template';
  initialCards.reverse().forEach(data => {
    renderCard(cardList, new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector).generate())
  });
}*/


