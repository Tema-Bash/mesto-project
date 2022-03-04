//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './../pages/index.css';

import {InitialProfile} from './UserInfo.js'
import {api} from './Api.js';
import {Section, handleCardLikeClick, handleCardDeleteClick, /*handleCardBigClick, handleSubmitNewCard*/} from './Section.js';
import {Card} from './card.js'
import {FormValidator} from "./FormValidator.js";
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from "./PopupWithForm.js";

const buttonAddNewCard = document.querySelector(".profile__add");
const buttonEditProfile = document.querySelector(".profile__edit");
const cardListSelector = '.cards__list'; 
const templateSelector = '#card-template';
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileAboutInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.popup_type_avatar');
const formElementAvatar = avatarPopup.querySelector('.popup__form_type_avatar');
const submitAvatarButton = formElementAvatar.querySelector('.popup__button');
const formElementProfile = document.querySelector(".popup__form_type_profile");
const submitProfileButton = formElementProfile.querySelector('.popup__button');
const newCardPopup = document.querySelector('.popup_type_cards');
const submitCardButton = newCardPopup.querySelector('.popup__button');
const userAvatarImg = document.querySelector('.profile__image');

//валидируем
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Объект селекторов для данных пользователя
const UserDataSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  imageSelector: '.profile__image',
}


const profile = new InitialProfile(UserDataSelectors)
profile.getUserInfo()

const FormNewCard = new FormValidator(options, '.popup__form_type_cards');
FormNewCard.enableValidation();

const FormNewAvatar = new FormValidator(options, '.popup__container_type_avatar');
FormNewAvatar.enableValidation();

const FormInfoUser = new FormValidator(options, '.popup__form_type_profile');
FormInfoUser.enableValidation();
              
//создаём экземпляр класса, для сохранения новой карточки 
export const popupWithFormCard = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    submitCardButton.textContent = "Сохранение...";
    //вызываем метод api для сохранение введеных данных о карточке на сервер
    api.cardRenderServer(data.formNameCard, data.formLinkCard)  
    .then((data)=> {  
      section._renderer(data);  
      FormNewCard._disableButton(submitCardButton, options.inactiveButtonClass) //изменить на метод класса FormValidator
      popupWithFormCard.close();
    })
    .catch((res) => {console.log(res)})
    .finally(() => {submitCardButton.textContent = "Создать"})
  }
})
              
//создаём экземпляр класса, для сохранения новой аватарки
const popupWithFormAvatar = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    submitAvatarButton.textContent = "Сохранение...";
    //вызываем метод api для сохранения аватарки 
    api.sendNewAvatar(data.formLinkAvatar)
    .then(() => {
      userAvatarImg.src = data.formLinkAvatar;
      FormNewAvatar._disableButton(submitAvatarButton, options.inactiveButtonClass) //изменить на метод класса FormValidator
      popupWithFormAvatar.close()
    })
    .catch((res)=>{alert(res)})
    .finally(() => {submitAvatarButton.textContent = "Сохранить"})
  }
})

//создаём экземпляр класса, для сохранения новых введеных данных в шапку профиля
const popupWithFormProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    submitProfileButton.textContent = "Сохранение..."
    //вызываем метод api для сохранения введеных данных о пользователе на сервер
    api.sendProfileData(data.formNameProfile, data.formAboutProfile)
    .then(() => {
      profileName.textContent = data.formNameProfile; 
      profileAbout.textContent = data.formAboutProfile;
      popupWithFormProfile.close()
    })
    .catch((res)=>{alert(res)})
    .finally(() => {submitProfileButton.textContent = "Сохранить"})
  } 
});

//создаём экземпляр класса, для откытия попапа с изображением
const popupWithImage = new PopupWithImage('.popup_type_image', '.popup__image', '.popup__name');

//открываем попап новой карточки
buttonAddNewCard.addEventListener("click", () => {
  popupWithFormCard.open();
});

//открываем попап смены автарки
profileAvatar.addEventListener("click", () => {
  popupWithFormAvatar.open();
})

//открываем попап профеля и подтягиваем значения строк из верстки
buttonEditProfile.addEventListener("click", () => {
  popupWithFormProfile.open();
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
})

//открываем попап конкретной карточки
function handleCardBigClick (event) { 
  popupWithImage.open(event);
  popupWithImage.setEventListeners();
};

//вешаем слушатели для взаимодействия с формами
popupWithFormCard.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithFormProfile.setEventListeners();

//создаём экземпляр класса секшн
export const section = new Section({
  renderer: (data) => {
    //грузим данные с сервера и рендерим их
    const card = new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, profile.id, templateSelector)
    const cardElement = card.generate();
    section.addItem(cardElement);
  }}, cardListSelector);

//грузим данные с сервера и рендерим их
api.getAppInfo()
  .then(([user, cards]) => {
    new InitialProfile(UserDataSelectors).setUserInfo(user)   // = initialProfileRender(user) рисуем начальный профиль
    section.renderItems(cards); //рисуем начальные карточки
  })
  .catch(err => console.log(err));