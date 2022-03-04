//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './../pages/index.css';
import {initialProfile} from './UserInfo';
import {api} from './Api.js';
import {FormValidator} from "./FormValidator.js";
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from "./PopupWithForm.js";
import {Section, handleCardLikeClick, handleCardDeleteClick} from './Section.js';
import {Card} from './card.js'
import {userId} from './UserInfo'

const buttonAddNewCard = document.querySelector(".profile__add");
const buttonEditProfile = document.querySelector(".profile__edit");
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileAboutInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector('.profile__avatar');
const userAvatarImg = document.querySelector('.profile__image');
const cardListSelector = '.cards__list'; // cardList Selector
const templateSelector = '#card-template';

//валидируем
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const FormNewCard = new FormValidator(options, '.popup__form_type_cards');
FormNewCard.enableValidation();

const FormNewAvatar = new FormValidator(options, '.popup__container_type_avatar');
FormNewAvatar.enableValidation();

const FormInfoUser = new FormValidator(options, '.popup__form_type_profile');
FormInfoUser.enableValidation();

//создаём экземпляр класса, для сохранение новой карточки 
export const popupWithFormCard = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    const popup = document.querySelector('.popup_type_cards')
    const submitCardButton = popup.querySelector(options.submitButtonSelector);
    submitCardButton.textContent = "Сохранение...";
    //вызываем метод api для сохранение введеных данных о карточке на сервер
    api.cardRenderServer(data.formNameCard, data.formLinkCard)  
    .then((data)=> {  
      section._renderer(data);  //renderCard(cardList, new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector).generate())
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
    const popup = document.querySelector('.popup_type_avatar');
    const submitAvatarButton = popup.querySelector(options.submitButtonSelector);
    submitAvatarButton.textContent = "Сохранение...";
    //вызываем метод api для сохранение аватарки 
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

//создаём экземпляр класса, для сохранение новых введеных данных в шапку профиля
const popupWithFormProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    const popup = document.querySelector('.popup_type_profile');
    const submitProfileButton = popup.querySelector(options.submitButtonSelector);
    submitProfileButton.textContent = "Сохранение..."
    //вызываем метод api для сохранение введеных данных о пользователе на сервер
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
};

//вешаем слушатели для взаимодействия с формами
popupWithFormCard.setEventListeners();
popupWithFormAvatar.setEventListeners()
popupWithFormProfile.setEventListeners()
 
//создаём экземпляр класса секшн
export const section = new Section({
  renderer: (data) => {
    const card = new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector)
    const cardElement = card.generate();
    section.addItem(cardElement);
  }}, cardListSelector);

//создаем объект с селектором
const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__image'
}

//грузим данные с сервера и рендерим их
api.getAppInfo()
  .then(([user, cards]) => {
    new initialProfile(profileSelectors).getUserInfo(user);
    section.renderItems(cards); //рисуем начальные карточки
  })
  .catch(err => console.log(err));


