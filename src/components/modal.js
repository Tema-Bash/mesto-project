
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

export const openPopupAvatarChange = () => {
  profileAvatar.addEventListener("click", () => {
    openPopup(avatarPopup);
  })
}
closePopupOnEsc() //закрытие на Esc
closeButton(avatarPopup);
clickOutClosePopup(avatarPopup);

closeButton(profilePopup);
clickOutClosePopup(profilePopup);

closeButton(newCardPopup);
clickOutClosePopup(newCardPopup);

closeButton(imagePopup);
clickOutClosePopup(imagePopup);

//открываем попап и подтягиваем значения строк из верстки
export const openPopupProfileUpdate = () => {
  buttonEditProfile.addEventListener("click", () => {
    openPopup(profilePopup);
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
  })
}

//открываем попап 
export const openPopupNewCard = () => {
  buttonAddNewCard.addEventListener("click", () => {
    openPopup(newCardPopup);
  });
}


//Сохраняем новые введеные данные в шапку профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '64f73e63-60f2-487f-9d1f-1d8ea3c050e0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileAboutInput.value
    })
  }); 
  closePopup(profilePopup);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);



import {handleSubmitNewCard} from "./card.js";
formAddNewCard.addEventListener('submit', handleSubmitNewCard);