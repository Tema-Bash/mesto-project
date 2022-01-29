//работа модальных окон тут
import {openPopup, closePopup, closeButton, clickOutClosePopup, closePopupOnEsc} from "./utils.js";
import {handleSubmitNewCard, formAddNewCard} from "./card.js";

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
  closePopup(profilePopup);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit); 
formAddNewCard.addEventListener('submit', handleSubmitNewCard);




