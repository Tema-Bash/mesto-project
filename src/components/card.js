//функции для работы с карточками проекта Mesto


import {openPopup, closePopup} from "./utils.js";

const newCardPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
export const formAddNewCard = document.querySelector(".popup__form_type_cards");
const cardNameInput = newCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.cards__list'); 
const cardTemplate = document.querySelector('#card-template').content;  

//поставить лайк
function handleCardLikeClick (event) {
  event.target.classList.toggle('card__button_active')
};
//удалить карточку нажатием на корзинку
function handleCardDeleteClick(event) {
  event.target.closest('.card').remove()
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
                      //надо переписать эти функции
  cardCloneElement.querySelector('.card__button').addEventListener('click', handleCardLikeClick);

  //удаляем корзинку если карточка не наша
  const deleteElement = cardCloneElement.querySelector('.card__delete');
  const isOwner = ownerId === currentUserId;
  if(!isOwner){
    console.log(1)
    deleteElement.classList.add('.card__delete_visibility_hidden');
  };

  cardCloneElement.querySelector('.card__delete').addEventListener('click', handleCardDeleteClick);
  
  return cardCloneElement
};

//добавляем карточку в начало страницы
function renderCard(cardList, cardCloneElement) {
  cardList.prepend(cardCloneElement)
};

//рендерим новую карточку 
export const handleSubmitNewCard = (evt) => {
  evt.preventDefault();
  renderCard(cardList, createCard(cardNameInput.value, cardLinkInput.value ))
  formAddNewCard.reset()
  closePopup(newCardPopup);
};

//рендерим начальный массив
export const renderInitialArray = (initialCards) => { 
  initialCards.forEach(item => {
    renderCard(cardList, createCard(item.name, item.link, item.likes, item._id, item.owner._id, item.currentUserId))
  });
}


