//конфиг для api 
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
        authorization: '64f73e63-60f2-487f-9d1f-1d8ea3c050e0',
        'Content-Type': 'application/json'
    }
}

//валидируем
export const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

export const popups = document.querySelectorAll('.popup')
export const profilePopup = document.querySelector('.popup_type_profile');
export const newCardPopup = document.querySelector('.popup_type_cards');
export const buttonEditProfile = document.querySelector(".profile__edit");
export const buttonAddNewCard = document.querySelector(".profile__add");
export const formElementProfile = document.querySelector(".popup__form_type_profile");
export const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
export const profileAboutInput = profilePopup.querySelector('.popup__input_type_about');
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const popupInputTypeLink = avatarPopup.querySelector('.popup__input_type_link'); 
export const formElementAvatar = avatarPopup.querySelector('.popup__form_type_avatar');
export const submitAvatarButton = formElementAvatar.querySelector('.popup__button');
export const submitProfileButton = formElementProfile.querySelector('.popup__button');

export const imagePopup = document.querySelector('.popup_type_image');
export const formAddNewCard = document.querySelector(".popup__form_type_cards");
export const cardNameInput = newCardPopup.querySelector('.popup__input_type_name');
export const cardLinkInput = newCardPopup.querySelector('.popup__input_type_link');
export const cardList = document.querySelector('.cards__list'); 
export const cardTemplate = document.querySelector('#card-template').content;  
export const submitCardButton = newCardPopup.querySelector('.popup__button');
export const imagePopupImage = imagePopup.querySelector('.popup__image');
export const imageCaption = imagePopup.querySelector('.popup__name');

export const userName = document.querySelector('.profile__name');
export const userAvatarImg = document.querySelector('.profile__image');
export const userAbout = document.querySelector('.profile__about');