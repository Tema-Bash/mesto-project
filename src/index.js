//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import img1 from './images/card-list-trip.jpg';
import img2 from './images/card-list-bus.jpg'
import img3 from './images/card-list-waterfall.jpg'
import img4 from './images/card-list-ride.jpg'
import img5 from './images/card-list-car.jpg'
import img6 from './images/card-list-cabot.jpg'
import './pages/index.css';
//рендерим начальные карточки
const initialCards = [
  {
    name: 'Долгая дорога',
    link: img1
  },
  {
    name: 'Это электробус',
    link: img2
  },
  {
    name: 'Водопад',
    link: img3
  },
  {
    name: 'Ночные покатушки',
    link: img4
  },
  {
    name: 'Загадочный парень',
    link: img5
  },
  {
    name: 'Кэбот Тауэр',
    link: img6
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