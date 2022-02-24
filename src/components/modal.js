
//работа модальных окон тут
import {openPopup, closePopup} from "./utils.js";
import {formAddNewCard} from "./card.js";
import {api} from './Api.js';
import {disableButton} from './validate.js'
import {userAvatarImg} from './profile.js'
import {options} from './index.js'
import {handleSubmitNewCard} from './Section.js'

const profilePopup = document.querySelector('.popup_type_profile');
const newCardPopup = document.querySelector('.popup_type_cards');
const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddNewCard = document.querySelector(".profile__add");
const formElementProfile = document.querySelector(".popup__form_type_profile");
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileAboutInput = profilePopup.querySelector('.popup__input_type_about');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.popup_type_avatar');
const popupInputTypeLink = avatarPopup.querySelector('.popup__input_type_link'); 
const formElementAvatar = avatarPopup.querySelector('.popup__form_type_avatar');
const submitAvatarButton = formElementAvatar.querySelector('.popup__button');
const submitProfileButton = formElementProfile.querySelector('.popup__button');

//открываем попап смены автарки
export const openPopupAvatarChange = () => {
  profileAvatar.addEventListener("click", () => {
    openPopup(avatarPopup);
  })
}

//сохраняем новую аватарку
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  submitAvatarButton.textContent = "Сохранение..."
  api.sendNewAvatar(popupInputTypeLink.value)
  .then(() => {
    userAvatarImg.src = popupInputTypeLink.value;
    formElementAvatar.reset();
    disableButton(submitAvatarButton, options.inactiveButtonClass)
    closePopup(avatarPopup)
  })
  .catch((res)=>{alert(res)})
  .finally(() => {submitAvatarButton.textContent = "Сохранить"})
}

//открываем попап и подтягиваем значения строк из верстки
export const openPopupProfileUpdate = () => {
  buttonEditProfile.addEventListener("click", () => {
    openPopup(profilePopup);
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
  })
};


//открываем попап новой карточки
export const openPopupNewCard = () => {
  buttonAddNewCard.addEventListener("click", () => {
    openPopup(newCardPopup);
  });
}

//Сохраняем новые введеные данные в шапку профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  submitProfileButton.textContent = "Сохранение..."

  api.sendProfileData(profileNameInput.value,profileAboutInput.value)
  .then(() => {
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    closePopup(profilePopup);
  })
  .catch((res)=>{alert(res)})
  .finally(() => {submitProfileButton.textContent = "Сохранить"})
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);
avatarPopup.addEventListener('submit', handleAvatarFormSubmit);
formAddNewCard.addEventListener('submit', handleSubmitNewCard);
