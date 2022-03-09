//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './../pages/index.css';
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js';
import {Section} from '../components/Section.js';
import {Card} from '../components/card.js'
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {
  buttonAddNewCard,
  buttonEditProfile,
  cardListSelector,
  templateSelector,
  profileName,
  profileAbout,
  profileAvatar,
  submitAvatarButton,
  submitProfileButton,
  submitCardButton,
  UserDataSelectors,
  formElementNewCard,
  formElementProfile,
  formElementAvatar,
  options
} from "../utils/constants.js";


//создаем экземпляр класса апи
export const api = new Api('https://nomoreparties.co/v1/plus-cohort-6', {
  authorization: '64f73e63-60f2-487f-9d1f-1d8ea3c050e0',
  'Content-Type': 'application/json'
});

//вешаем валидацию
const formNewCard = new FormValidator(options, formElementNewCard);
formNewCard.enableValidation();

const formNewAvatar = new FormValidator(options, formElementAvatar);
formNewAvatar.enableValidation();

const formInfoUser = new FormValidator(options, formElementProfile);
formInfoUser.enableValidation();
            
//создаем профиль пользователя с персональным id
const profile = new UserInfo(UserDataSelectors, {fillInfo: () => {
  api.getUser() 
    .then((user) => {
      profile.id = user._id;
      profile.name = user.name;
      profile.about = user.about;
      profile.avatar = user.avatar;
      profile.cohort = user.cohort;
    })
}})
profile.getUserInfo()

//создаём экземпляр класса, для сохранения новой карточки 
export const popupWithFormCard = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    submitCardButton.textContent = "Сохранение...";
    //вызываем метод api для сохранение введеных данных о карточке на сервер
    api.cardRenderServer(data.formNameCard, data.formLinkCard)  
    .then((data)=> {  
      section.renderer(data);
      formNewCard.disableButton(submitCardButton, options.inactiveButtonClass);   //submitCardButton, options.inactiveButtonClass не нужно передавать в вызовы методов 
      //кземпляра FormValidator, так как сам класс внутри знает свою кнопку и селекторы валидации
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
    //вызываем метод api для обновления аватарки на сервере
    api.sendNewAvatar(data.formLinkAvatar)
    .then((updateUser) => {
      profile.setUserInfo(updateUser)
      formNewAvatar.disableButton(submitAvatarButton, options.inactiveButtonClass);  //submitCardButton, options.inactiveButtonClass не нужно передавать в вызовы методов экземпляра FormValidator, так как сам класс внутри знает свою кнопку и селекторы валидации
      popupWithFormAvatar.close()
    })
    .catch((res)=>{console.log(res)})
    .finally(() => {submitAvatarButton.textContent = "Сохранить"})
  }
})

//создаём экземпляр класса, для сохранения новых введеных данных в шапку профиля
const popupWithFormProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    submitProfileButton.textContent = "Сохранение..."
    //вызываем метод api для сохранения введеных данных о пользователе на сервер
    api.sendProfileData(data.formNameProfile, data.formAboutProfile)
    .then((updateUser) => {
      profile.setUserInfo(updateUser)
      popupWithFormProfile.close()
    })
    .catch((res)=>{console.log(res)})
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

//открываем попап профиля и подтягиваем значения строк из верстки
buttonEditProfile.addEventListener("click", () => {
  popupWithFormProfile.open();
  profile.getUserInfo().name = profileName.textContent;
  profile.getUserInfo().about = profileAbout.textContent;
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

//ставим лайки
function handleLike(card) {
  if(card.isLiked()){
    api.deleteLike(card.cardId)
    .then((res) => {
      card.updateLikes(res)
    })
    .catch((res)=>{
      console.log(res)
    })
  } else {
    api.putLike(card.cardId)  
    .then((res) => {
      card.updateLikes(res)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

//удаляем карточку с сервера
function handleDelete(card) {
  api.deleteCard(card.cardId)
  .catch((res)=>{console.log(res)});
}

//создаём экземпляр класса секшн
export const section = new Section({
  renderer: (data) => {
    //грузим данные с сервера и рендерим их
    const card = new Card({data, handleCardBigClick, handleLike, handleDelete}, profile.id, templateSelector)
    const cardElement = card.generate();
    section.addItem(cardElement);
  }
}, cardListSelector);

//грузим данные с сервера и рендерим их
api.getAppInfo()
  .then(([user, cards]) => {
    profile.setUserInfo(user)
    section.renderItems(cards)
  })
  .catch(err => console.log(err));