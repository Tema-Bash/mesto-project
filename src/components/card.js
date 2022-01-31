//функции для работы с карточками проекта Mesto
import {openPopup, closePopup} from "./utils.js";
import {deleteLike, putLike, deleteCard, cardRenderServer} from './api.js';
import {userId} from './profile.js'

const newCardPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
export const formAddNewCard = document.querySelector(".popup__form_type_cards");
const cardNameInput = newCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.cards__list'); 
const cardTemplate = document.querySelector('#card-template').content;  
const submitCardButton = newCardPopup.querySelector('.popup__button');
//поставить лайк

function handleCardLikeClick (evt, cardId) {
  if(evt.target.classList.contains('card__button_active')){
    deleteLike(cardId)
    .then(res => evt.target.parentElement.querySelector('.card__likes').textContent = res.likes.length)
    .then((_) => evt.target.classList.toggle('card__button_active'));
  }else {
    putLike(cardId)
    .then(res => evt.target.parentElement.querySelector('.card__likes').textContent = res.likes.length)
    .then((_) => evt.target.classList.toggle('card__button_active'));
  }
};

//удалить карточку нажатием на корзинку
function handleCardDeleteClick(evt, cardId) {
  deleteCard(cardId)
  .then((_) => evt.target.closest('.card').remove());
};

//открываем попап конкретной карточки
function handleCardBigClick (event) {
  openPopup(imagePopup);
  const imagePopupImage = imagePopup.querySelector('.popup__image');
  imagePopupImage.src = event.target.src;
  imagePopupImage.alt = event.target.alt;
  imagePopup.querySelector('.popup__name').textContent = event.target.closest('.card').querySelector('.card__title').textContent;
};

//создаем карточку
export const createCard = (name, link, likes, cardId, ownerId, currentUserId, handleLikeClick, handleDeleteClick) => {
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
};

//добавляем карточку в начало страницы
export function renderCard(cardList, cardCloneElement) {
  cardList.prepend(cardCloneElement)
};

//рендерим новую карточку 

export const handleSubmitNewCard = (evt) => {
  evt.preventDefault();
  submitCardButton.textContent = "Сохранение...";
  cardRenderServer(cardNameInput.value, cardLinkInput.value)
  .then((user)=> {
    renderCard(cardList, createCard(user.name, user.link, [], user._id));
    formAddNewCard.reset();
    closePopup(newCardPopup);
  })
  .finally(() => {submitCardButton.textContent = "Создать"})
};


//рендерим начальный массив
export const renderInitialArray = (initialCards) => { 
  const currentUserId = userId;
  initialCards.reverse().forEach(item => {
    renderCard(cardList, createCard(item.name, item.link, item.likes, item._id, item.owner._id, currentUserId))
  });
}


