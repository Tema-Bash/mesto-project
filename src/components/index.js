//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './../pages/index.css';
import {enableValidation} from './validate.js';
import {openPopupNewCard, openPopupProfileUpdate, openPopupAvatarChange} from "./modal.js"
import {renderInitialArray} from "./card.js";
import {initialProfileRender} from './profile.js';
import {getAppInfo} from './api.js';

//валидируем
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(options);  

//вешаем слушатели для открытия попапов
openPopupNewCard()
openPopupProfileUpdate();
openPopupAvatarChange();

//грузим данные с сервера и рендерим их
getAppInfo()
  .then(([user, cards]) => {
    initialProfileRender(user);
    renderInitialArray(cards);
  })
  .catch(err => console.log(err));


