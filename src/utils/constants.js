export const buttonAddNewCard = document.querySelector(".profile__add");
export const buttonEditProfile = document.querySelector(".profile__edit");
export const cardListSelector = '.cards__list'; 
export const templateSelector = '#card-template';
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileAboutInput = document.querySelector('.popup__input_type_about');
export const formElementAvatar = avatarPopup.querySelector('.popup__form_type_avatar');
export const submitAvatarButton = formElementAvatar.querySelector('.popup__button');
export const formElementProfile = document.querySelector(".popup__form_type_profile");
export const formElementNewCard = document.querySelector(".popup__form_type_cards");
export const submitProfileButton = formElementProfile.querySelector('.popup__button');
export const newCardPopup = document.querySelector('.popup_type_cards');
export const submitCardButton = newCardPopup.querySelector('.popup__button');
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
export const UserDataSelectors = {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    imageSelector: '.profile__image',
  }