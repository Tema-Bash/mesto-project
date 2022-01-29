//работу модальных окон тут
import {openPopup, closePopup} from "./utils.js";

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


//слушатель на "крестик" для закрытия попапа профиля()
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
//слушатель на "крестик" для закрытия попапа окна добавления карточек
newCardPopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(newCardPopup)});



//закрываем папал конкретной карточки на крестик
imagePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(imagePopup)})
//закрыть попап конкретной карточки при клике вне белого контейнера попапа
imagePopup.addEventListener("click",() => {closePopup(imagePopup)})
imagePopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
});

