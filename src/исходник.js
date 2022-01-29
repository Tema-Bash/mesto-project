//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут

const initialCards = [
  {
    name: 'Долгая дорога',
    link: 'images/card-list-trip.jpg'
  },
  {
    name: 'Это электробус',
    link: 'images/card-list-bus.jpg'
  },
  {
    name: 'Водопад',
    link: 'images/card-list-waterfall.jpg'
  },
  {
    name: 'Ночные покатушки',
    link: 'images/card-list-ride.jpg'
  },
  {
    name: 'Загадочный парень',
    link: 'images/card-list-car.jpg'
  },
  {
    name: 'Кэбот Тауэр',
    link: 'images/card-list-cabot.jpg'
  }
]; 
const profilePopup = document.querySelector('.popup_type_profile');
const newCardPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddNewCard = document.querySelector(".profile__add");
const formElementProfile = document.querySelector(".popup__form_type_profile");
const formAddNewCard = document.querySelector(".popup__form_type_cards");
const cardNameInput = newCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_link');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileAboutInput = profilePopup.querySelector('.popup__input_type_about');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const cardList = document.querySelector('.cards__list'); 
const cardTemplate = document.querySelector('#card-template').content;  
  //функции открытия закрытия попапа
  const openPopup = (popup) => {
    popup.classList.add("popup_opened");
  }
  const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
  }
  //слушатель на "крестик" для закрытия попапа профиля
  profilePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(profilePopup)});
  //открываем попап и подтягиваем значения строк из верстки
  buttonEditProfile.addEventListener("click", () => {
    openPopup(profilePopup)
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
  })
  //закрыть попап профиля при клике вне белого контейнера попапа
  profilePopup.addEventListener("click",() => {closePopup(profilePopup)}) 
  //экранируем слушатель от внутреннего контейнера, чтобы при клике по белому фону не закрывался попап   
  profilePopup.querySelector(".popup__container").addEventListener("click", (event) => {
    event.stopPropagation()
  });
  //Сохраняем новые введеные данные в шапку профиля
  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    closePopup(profilePopup);
  }
  formElementProfile.addEventListener('submit', handleProfileFormSubmit); 

  buttonAddNewCard.addEventListener("click", () => {openPopup(newCardPopup)});
  //закрыть попап при клике вне белого контейнера попапа
  newCardPopup.addEventListener("click",() => {closePopup(newCardPopup)})
  newCardPopup.querySelector(".popup__container").addEventListener("click", (event) => {
    event.stopPropagation()
  });
  //слушатель на "крестик" для закрытия попапа карточек
  newCardPopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(newCardPopup)});
//поставить лайк
function handleCardLikeClick (event) {
  event.target.classList.toggle('card__button_active')
};
//удалить карточку нажатием на корозинку
function handleCardDeleteClick(event) {
  event.target.closest('.card').remove()
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
//рендерим начальный массив
initialCards.forEach(item => {
  renderCard(cardList, createCard(item.link, item.name))
});

//рендерим новую карточку 
const handleSubmitNewCard = (evt) => {
  evt.preventDefault();
  renderCard(cardList, createCard(cardLinkInput.value,cardNameInput.value))
  formAddNewCard.reset()
  closePopup(newCardPopup);
};
formAddNewCard.addEventListener('submit', handleSubmitNewCard); 

//открываем попап конкретной карточки
function handleCardBigClick (event) {
  openPopup(imagePopup);
  const imagePopupImage = imagePopup.querySelector('.popup__image');
  imagePopupImage.src = event.target.src;
  imagePopupImage.alt = event.target.alt;
  imagePopup.querySelector('.popup__name').textContent = event.target.closest('.card').querySelector('.card__title').textContent;
};
//закрываем папал конкретной карточки на крестик
imagePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(imagePopup)})
//закрыть попап конкретной карточки при клике вне белого контейнера попапа
imagePopup.addEventListener("click",() => {closePopup(imagePopup)})
imagePopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
});

//go validirovatb

import {enableValidation} from './validate.js'

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  