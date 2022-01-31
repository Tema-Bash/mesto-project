//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import img1 from './images/card-list-trip.jpg';
import img2 from './images/card-list-bus.jpg'
import img3 from './images/card-list-waterfall.jpg'
import img4 from './images/card-list-ride.jpg'
import img5 from './images/card-list-car.jpg'
import img6 from './images/card-list-cabot.jpg'
import './pages/index.css';
//рендерим начальные карточки
/*
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
*/


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
import {openPopupNewCard, openPopupProfileUpdate, openPopupAvatarChange} from "./components/modal.js"
openPopupNewCard()
openPopupProfileUpdate();
openPopupAvatarChange();

//то что пойдет в апи
const config ={
  baseUrl: `https://nomoreparties.co/v1/plus-cohort-6`,
  headers: {
    authorization: `64f73e63-60f2-487f-9d1f-1d8ea3c050e0`,
    'Content-Type': 'application/json'
  }
};

export const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(res => getResponseData(res));
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => getResponseData(res));
};

const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};
import {renderInitialArray} from "./components/card.js";
import {initialProfileRender} from './components/profile.js';
getAppInfo()
  .then(([user, cards]) => {
    initialProfileRender(user);
    renderInitialArray(cards);
  })
  .catch(err => console.log(err));


