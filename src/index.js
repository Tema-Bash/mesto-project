//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './pages/index.css';
import {enableValidation} from './components/validate.js';
import {openPopupNewCard, openPopupProfileUpdate, openPopupAvatarChange} from "./components/modal.js"
import {renderInitialArray} from "./components/card.js";
import {initialProfileRender} from './components/profile.js';
import {getAppInfo} from './components/api.js';

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


