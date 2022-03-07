//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './../pages/index.css';
import {InitialProfile} from '../components/UserInfo.js'
import {Api} from '../components/Api.js';
import {Section, handleCardLikeClick, handleCardDeleteClick} from '../components/Section.js';
import {Card} from '../components/card.js'
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {
  buttonAddNewCard,
  buttonEditProfile,
  cardListSelector,
  templateSelector,
  profileNameInput,
  profileAboutInput,
  profileName,
  profileAbout,
  profileAvatar,
  submitAvatarButton,
  submitProfileButton,
  submitCardButton,
  UserDataSelectors,
  userAvatarImg, 
  options
} from "../utils/constants.js";

//создаем экземпляр класса апи
export const api = new Api('https://nomoreparties.co/v1/plus-cohort-6', {
  authorization: '64f73e63-60f2-487f-9d1f-1d8ea3c050e0',
  'Content-Type': 'application/json'
});

const profile = new InitialProfile(UserDataSelectors)
profile.getUserInfo()

const formNewCard = new FormValidator(options, '.popup__form_type_cards');
formNewCard.enableValidation();

const formNewAvatar = new FormValidator(options, '.popup__container_type_avatar');
formNewAvatar.enableValidation();

const formInfoUser = new FormValidator(options, '.popup__form_type_profile');
formInfoUser.enableValidation();
              
//создаём экземпляр класса, для сохранения новой карточки 
export const popupWithFormCard = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    submitCardButton.textContent = "Сохранение...";
    //вызываем метод api для сохранение введеных данных о карточке на сервер
    api.cardRenderServer(data.formNameCard, data.formLinkCard)  
    .then((data)=> {  
      section._renderer(data);  
      formNewCard.disableButton(); // не работает
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
      formNewAvatar.disableButton(); // не работает
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
};

//вешаем слушатели для взаимодействия с формами
popupWithFormCard.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();

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
    profile.setUserInfo(user)   // = initialProfileRender(user) рисуем начальный профиль
    section.renderItems(cards); //рисуем начальные карточки
  })
  .catch(err => console.log(err));