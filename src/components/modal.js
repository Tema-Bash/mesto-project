
//работа модальных окон тут
import {openPopup, closePopup, closeButton, clickOutClosePopup, closePopupOnEsc} from "./utils.js";
import {formAddNewCard,renderCard, cardList, createCard} from "./card.js";

const profilePopup = document.querySelector('.popup_type_profile');
const newCardPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddNewCard = document.querySelector(".profile__add");
const formElementProfile = document.querySelector(".popup__form_type_profile");
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileAboutInput = profilePopup.querySelector('.popup__input_type_about');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const profileAvatar = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.popup_type_avatar');

closeButton(avatarPopup);
clickOutClosePopup(avatarPopup);

closeButton(profilePopup);
clickOutClosePopup(profilePopup);

closeButton(newCardPopup);
clickOutClosePopup(newCardPopup);

closeButton(imagePopup);
clickOutClosePopup(imagePopup);

//открываем попап смены автарки
export const openPopupAvatarChange = () => {
  profileAvatar.addEventListener("click", () => {
    openPopup(avatarPopup);
  })
}

import {userAvatarImg} from './profile.js'
const popupInputTypeLink = avatarPopup.querySelector('.popup__input_type_link'); 
const formElementAvatar = avatarPopup.querySelector('.popup__form_type_avatar');

const submitAvatarButton = formElementAvatar.querySelector('.popup__button');
//сохраняем новую аватарку
const handleAvaraeFormSubmit = (evt) => {
  evt.preventDefault();
  submitAvatarButton.textContent = "Сохранение..."
  sendNewAvatar(popupInputTypeLink.value)
  .then(() => {
    userAvatarImg.src = popupInputTypeLink.value;
    formElementAvatar.reset();
    closePopup(avatarPopup)
  })
  .catch((res)=>{alert(res)})
  .finally(() => {submitAvatarButton.textContent = "Сохранить"})
}

avatarPopup.addEventListener('submit', handleAvaraeFormSubmit);

//открываем попап и подтягиваем значения строк из верстки
export const openPopupProfileUpdate = () => {
  buttonEditProfile.addEventListener("click", () => {
    openPopup(profilePopup);
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
  })
}

//открываем попап новой карточки
export const openPopupNewCard = () => {
  buttonAddNewCard.addEventListener("click", () => {
    openPopup(newCardPopup);
  });
}

//Сохраняем новые введеные данные в шапку профиля
const submitProfileButton = formElementProfile.querySelector('.popup__button');
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  submitProfileButton.textContent = "Сохранение..."
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  sendProfileData(profileNameInput.value,profileAboutInput.value)
  .then(() => {closePopup(profilePopup)})
  .catch((res)=>{alert(res)})
  .finally(() => {submitProfileButton.textContent = "Сохранить"})
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);



import {handleSubmitNewCard} from "./card.js";
import {sendNewAvatar, sendProfileData} from "./api.js";
formAddNewCard.addEventListener('submit', handleSubmitNewCard);
