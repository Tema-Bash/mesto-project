//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import './../pages/index.css';
import {openPopupNewCard, openPopupProfileUpdate, openPopupAvatarChange} from "./modal.js"
import {renderInitialArray} from "./card.js";
import {initialProfileRender} from './profile.js';
import {api} from './Api.js';
import {openPopup, closePopup} from "./utils.js";
import {FormValidator} from "./FormValidator.js"
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__name');

//валидируем
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const FormNewCard = new FormValidator(options, '.popup__form_type_cards');
FormNewCard.enableValidation();

const FormNewAvatar = new FormValidator(options, '.popup__container_type_avatar');
FormNewAvatar.enableValidation();

const FormInfoUser = new FormValidator(options, '.popup__form_type_profile');
FormInfoUser.enableValidation();

//вешаем слушатели для открытия попапов
openPopupNewCard()
openPopupProfileUpdate();
openPopupAvatarChange();


  import {Section, handleCardLikeClick, handleCardDeleteClick, handleCardBigClick, handleSubmitNewCard} from './Section.js';
  const cardListSelector = '.cards__list'; // cardList Selector
  const templateSelector = '#card-template';
  import {Card} from './card.js'
  import {userId} from './profile.js'
  
//создаём экземпляр класса секшн
export const section = new Section({
  renderer: (data) => {
    const card = new Card({data, handleCardBigClick , handleCardLikeClick , handleCardDeleteClick }, userId, templateSelector)
    const cardElement = card.generate();
    section.addItem(cardElement);
  }}, cardListSelector);

//грузим данные с сервера и рендерим их
api.getAppInfo()
  .then(([user, cards]) => {
    initialProfileRender(user);
    section.renderItems(cards); //рисуем начальные карточки
  })
  .catch(err => console.log(err));


