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
function createCard(link, title) {
  const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardCloneElementImage = cardCloneElement.querySelector('.card__image');
  cardCloneElementImage.src = link;
  cardCloneElementImage.alt = title;
  cardCloneElement.querySelector('.card__title').textContent = title;
  cardCloneElement.querySelector('.card__button').addEventListener('click', handleCardLikeClick);
  cardCloneElement.querySelector('.card__delete').addEventListener('click', handleCardDeleteClick);
  cardCloneElementImage.addEventListener('click', handleCardBigClick)
  return cardCloneElement
};

//добавляем карточку в начало страницы
function renderCard(cardList, cardCloneElement) {
  cardList.prepend(cardCloneElement)
};

//рендерим новую карточку 
export const handleSubmitNewCard = (evt) => {
  evt.preventDefault();
  renderCard(cardList, createCard(cardLinkInput.value,cardNameInput.value))
  formAddNewCard.reset()
  closePopup(newCardPopup);
};

//рендерим начальный массив
export const renderInitialArray =(initialCards)=>{ 
  initialCards.forEach(item => {
    renderCard(cardList, createCard(item.link, item.name))
  });
}


