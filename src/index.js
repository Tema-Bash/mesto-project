//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут


//validirovatb

import {enableValidation} from './validate.js'

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  