//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут

//рендерим начальные карточки
const initialCards = [
  {
    name: 'Долгая дорога',
    link: 'images/card-list-trip.jpg'
  },
  {
    name: 'Это электробус',
    link: 'images/card-list-bus.jpg'
  },
  {
    name: 'Водопад',
    link: 'images/card-list-waterfall.jpg'
  },
  {
    name: 'Ночные покатушки',
    link: 'images/card-list-ride.jpg'
  },
  {
    name: 'Загадочный парень',
    link: 'images/card-list-car.jpg'
  },
  {
    name: 'Кэбот Тауэр',
    link: 'images/card-list-cabot.jpg'
  }
];
import {renderInitialArray} from "./components/card.js";
renderInitialArray(initialCards);


//валидируем
import {enableValidation} from './components/validate.js';
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  


//вешаем слушатели для открытия попапов
import {openPopupNewCard, openPopupProfileUpdate} from "./components/modal.js"
openPopupNewCard()
openPopupProfileUpdate();