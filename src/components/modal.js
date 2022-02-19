
//работа модальных окон тут
import {openPopup, closePopup} from "../utils/utils.js";
import {handleSubmitNewCard} from "./card.js";
import {api} from '../pages/index.js';
import {disableButton} from './validate.js';
import {
options, 
profilePopup,
newCardPopup,
buttonEditProfile,
buttonAddNewCard,
formElementProfile,
profileNameInput,
profileAboutInput,
profileName,
profileAbout,
profileAvatar,
avatarPopup,
popupInputTypeLink,
formElementAvatar,
submitAvatarButton,
submitProfileButton,
formAddNewCard,
userAvatarImg } from '../utils/constants.js';

//открываем попап смены автарки
export const openPopupAvatarChange = () => {
  profileAvatar.addEventListener("click", () => {
    openPopup(avatarPopup);
  })
}

//сохраняем новую аватарку
const handleAvaraeFormSubmit = (evt) => {
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
avatarPopup.addEventListener('submit', handleAvaraeFormSubmit);
formAddNewCard.addEventListener('submit', handleSubmitNewCard);
